import { PrismaClient } from "@prisma/client";
import { createMocks } from "node-mocks-http";

import { POST } from "@/app/api/performance-comparison/route";

async function checkDatabaseConnected(prisma) {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return true;
  } catch (error) {
    console.error("Database connection failed:", error);
    return false;
  } finally {
    await prisma.$disconnect();
  }
}

describe("데이터베이스", () => {
  it("데이터베이스와 연결되어야 한다.", async () => {
    const prisma = new PrismaClient();
    const isConnected = await checkDatabaseConnected(prisma);

    expect(isConnected).toBe(true);
  });
});

describe("/api/performance-comparison", () => {
  const req = createMocks({
    method: "POST",
  });

  it("매개변수가 객체 또는 배열인 경우 타입 추론 에러와 상태코드 400을 반환해야 한다.", async () => {
    req.json = async () => ({
      functionCode: "function userCode(a) { return a }",
      functionArguments: "[[1, 2, 3]]",
      functionCall: `userCode([1, 2, 3])`,
      functionName: "userCode",
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty("errorStackMessage");
  });

  it("함수 로직 내부에 객체 또는 배열이 존재하는 경우 타입 추론 에러와 상태코드 400을 반환해야 한다.", async () => {
    req.json = async () => ({
      functionCode: `
        function userCode(a, b) {
          const arr = [1, 2, 3]
          return a + b;
        }
      `,
      functionArguments: "[1, 2]",
      functionCall: "userCode(1, 2)",
      functionName: "userCode",
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toHaveProperty("errorStackMessage");
  });
});
