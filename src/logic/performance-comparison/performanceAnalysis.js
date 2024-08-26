export function measurePerformanceByFunc(targetFunc, args, type) {
  const startTime = performance.now();
  const startCpu = process.cpuUsage();

  targetFunc(...args);

  const endCpu = process.cpuUsage(startCpu);
  const endTime = performance.now();

  return {
    type,
    cpuUsage: endCpu.user,
    executionTime: endTime - startTime,
  };
}

export async function getPerformanceResult({ jsFn, wasmFn, args }) {
  const [jsPerformanceResult, wasmPerformanceResult] = await Promise.allSettled(
    [
      measurePerformanceByFunc(jsFn, args, "JS"),
      measurePerformanceByFunc(wasmFn, args, "WASM"),
    ],
  );

  return {
    jsPerformance: jsPerformanceResult.value ?? jsPerformanceResult.reason,
    wasmPerformance:
      wasmPerformanceResult.value ?? wasmPerformanceResult.reason,
  };
}

export function calculateAverageExecutionTime(targetPerformanceResults) {
  const filteredFulfilledResults = targetPerformanceResults.filter((result) => {
    return (
      result.hasOwnProperty("executionTime") &&
      result.executionTime !== null &&
      result.executionTime !== undefined
    );
  });

  const totalExecutionTime = filteredFulfilledResults.reduce((acc, cur) => {
    const currentExecutionTime = cur.executionTime;
    acc += currentExecutionTime;

    return acc;
  }, 0);

  return totalExecutionTime / filteredFulfilledResults.length;
}
