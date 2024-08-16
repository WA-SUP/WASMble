const { PrismaClient } = require("@prisma/client");

async function isDatabaseConnected(prisma) {
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
    const isConnected = await isDatabaseConnected(prisma);

    expect(isConnected).toBe(true);
  });
});