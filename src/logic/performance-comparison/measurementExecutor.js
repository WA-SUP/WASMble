import vm from "vm";

import { createWasmInstance } from "@utils/webAssemblyUtils";
import { generateJsCode } from "@utils/codeGenerator";

import {
  calculateAverageExecutionTime,
  getPerformanceResult,
  measurePerformanceByFunc,
} from "@logic/performance-comparison/performanceAnalysis";

export default async function executeMeasurementInVm({
  javascriptCode,
  wasmBuffer,
  extractedJsFuncName,
  args,
  repeatCount = 1,
}) {
  const ELEMENT_TO_FILL = 0;

  const wasmInstance = await createWasmInstance(wasmBuffer);
  const jsFunc = generateJsCode(javascriptCode, extractedJsFuncName);
  const funcExecutionList = new Array(repeatCount)
    .fill(ELEMENT_TO_FILL)
    .map((_) => {
      return "getPerformanceResult({ jsFn, wasmFn, args })";
    });

  const scriptSource = `
    var performanceResults = (async () => {
      return await Promise.allSettled([${funcExecutionList.join(",")}]);
    })();
  `;

  const scriptCode = new vm.Script(scriptSource);
  const sandboxEnv = {
    getPerformanceResult,
    measurePerformanceByFunc,
    args,
    wasmFn: wasmInstance[extractedJsFuncName],
    jsFn: jsFunc,
  };

  const executionContext = vm.createContext(sandboxEnv);
  scriptCode.runInContext(executionContext);

  const performanceResults = await context["performanceResults"];

  const jsPerformanceResults = performanceResults.map((result) => {
    return result.jsPerformance;
  });

  const wasmPerformanceResults = performanceResults.map((result) => {
    return result.wasmPerformance;
  });
  const jsAverageExecutionTimes =
    calculateAverageExecutionTime(jsPerformanceResults);

  const wasmAverageExecutionTimes = calculateAverageExecutionTime(
    wasmPerformanceResults,
  );

  return {
    jsAverageExecutionTimes,
    wasmAverageExecutionTimes,
    ...performanceResults,
  };
}
