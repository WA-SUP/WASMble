import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface MeasurementResult {
  type: string;
  operationTimes: number;
}

interface CreatePerformanceReportParams {
  transpiledAsCode: string;
  jsCode: string;
  measurementResults: MeasurementResult[];
}

export async function createPerformanceReport({
  transpiledAsCode,
  jsCode,
  measurementResults,
}: CreatePerformanceReportParams): Promise<string> {
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

export async function findPerformanceReportById(id: string) {
  return await prisma.performanceReport.findUnique({
    where: { id },
    include: { measurementResults: true },
  });
}
