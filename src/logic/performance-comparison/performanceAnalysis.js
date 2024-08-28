import { MODULE_TYPE_TEXT } from "@constants/constant";

export function measurePerformance(targetFunc, args, type, sec = 1) {
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

export async function getPerformanceResultsByFunc({ jsFn, wasmFn, args, sec }) {
  const performanceResult = await Promise.allSettled([
    measurePerformance(jsFn, args, MODULE_TYPE_TEXT.JAVASCRIPT, sec),
    measurePerformance(wasmFn, args, MODULE_TYPE_TEXT.WEB_ASSEMBLY, sec),
  ]);

  return performanceResult.map((result) => {
    return result.value ?? result.reason;
  });
}
