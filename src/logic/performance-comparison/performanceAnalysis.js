export function measurePerformanceByFunc(targetFunc, args) {
  const startTime = performance.now();
  const startCpu = process.cpuUsage();

  targetFunc(...args);

  const endCpu = process.cpuUsage(startCpu);
  const endTime = performance.now();

  return {
    cpuUsage: endCpu,
    runTime: endTime - startTime,
  };
}

export async function getPerformanceResult({ jsFn, wasmFn, args }) {
  const resultList = await Promise.allSettled([
    measurePerformance(jsFn, args),
    measurePerformance(wasmFn, args),
  ]);

  const [jsPerformance, wasmPerformance] = resultList;

  return { jsPerformance, wasmPerformance };
}
