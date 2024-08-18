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
  it("함수 이외의 타입을 코드 에디터에 입력한 경우 상태코드 400을 반환해야 한다.", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        functionCode: "const a = 1",
        functionArguments: ["a", "b", "c"],
      },
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      errorMessage: "올바르지 않은 요청입니다.",
    });
  });

  it("올바르지 않은 매개변수를 입력한 경우 상태코드 400을 반환해야 한다.", async () => {
    const { req } = createMocks({
      method: "POST",
      body: {
        functionCode: `
          function userCode(a, b) {
            return a + b;
          }
        `,
        functionArguments: undefined,
      },
    });

    const response = await POST(req);

    expect(response.status).toBe(400);
    expect(await response.json()).toEqual({
      errorMessage: "올바르지 않은 요청입니다.",
    });
  });
});
