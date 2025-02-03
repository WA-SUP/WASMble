import { PrismaClient } from "@prisma/client";
import { MODULE_TYPE_TEXT } from "@constants/constant";

const prisma = new PrismaClient();

export interface MeasurementResult {
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

export function measurePerformance(
  targetFunc: (...args: (string | number | boolean | null)[]) => void,
  args: (string | number | boolean | null)[],
  type: string,
  sec: number = 1,
): MeasurementResult {
  const duration = sec * 1000;
  const startTimestamp = performance.now();
  let operationTimes = 0;

  while (performance.now() - startTimestamp < duration) {
    targetFunc(...args);
    operationTimes++;
  }

  return {
    type,
    operationTimes,
  };
}

interface GetPerformanceResultsParams {
  jsFn: (...args: (string | number | boolean | null)[]) => void;
  wasmFn: (...args: (string | number | boolean | null)[]) => void;
  args: (string | number | boolean | null)[];
  sec: number;
}

export async function getPerformanceResultsByFunc({
  jsFn,
  wasmFn,
  args,
  sec,
}: GetPerformanceResultsParams): Promise<MeasurementResult[]> {
  const performanceResult = await Promise.allSettled([
    measurePerformance(jsFn, args, MODULE_TYPE_TEXT.JAVASCRIPT, sec),
    measurePerformance(wasmFn, args, MODULE_TYPE_TEXT.WEB_ASSEMBLY, sec),
  ]);

  return performanceResult.map((result) =>
    result.status === "fulfilled"
      ? result.value
      : { type: "Error", operationTimes: 0 },
  );
}
