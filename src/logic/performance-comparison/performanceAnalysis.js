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
    measurePerformance(jsFn, args, "JS", sec),
    measurePerformance(wasmFn, args, "WASM", sec),
  ]);

  return performanceResult.map((result) => {
    return result.value ?? result.reason;
  });
}
