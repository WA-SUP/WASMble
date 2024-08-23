import vm from "vm";

import { createWasmInstance } from "@utils/webAssemblyUtils";
import { generateJsCode } from "@utils/codeGenerator";

import {
  getPerformanceResult,
  measurePerformanceByFunc,
} from "@logic/performance-comparison/performanceAnalysis";

export default async function executeMeasurementInVm({
  javascriptCode,
  assemblyScriptCode,
  args,
  repeatCount,
}) {
  const ELEMENT_TO_FILL = 0;

  const wasmInstance = await createWasmInstance(assemblyScriptCode);
  const jsFunc = generateJsCode(javascriptCode);
  const extractedJsFuncName = javascriptCode.match(/function (\w+)/)[1];

  const funcExecutionList = new Array(repeatCount)
    .fill(ELEMENT_TO_FILL)
    .map((_) => {
      return "getPerformanceResult({ jsFn, wasmFn, args })";
    });

  const scriptSource = `const performanceResults = (async () => {
    return await Promise.allSettled([${funcExecutionList.join(",")}]);
  })();`;

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

  return await context.performanceResults;
}
