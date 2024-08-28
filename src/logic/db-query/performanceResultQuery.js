import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createPerformanceReport({
  transpiledAsCode,
  jsCode,
  measurementResults,
}) {
  const { id } = await prisma.performanceReport.create({
    data: {
      transpiledAsCode,
      jsCode,
      measurementResults: {
        create: measurementResults,
      },
    },
  });

  return id;
}

export async function findPerformanceReportById(id) {
  return await prisma.performanceReport.findUnique({
    where: {
      id,
    },
    include: {
      measurementResults: true,
    },
  });
}
