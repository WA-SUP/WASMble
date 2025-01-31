import vm from "vm";

import { createWasmInstance } from "@utils/webAssemblyUtils";
import { generateJsCode } from "@utils/codeGenerator";

import {
  getPerformanceResultsByFunc,
  measurePerformance,
} from "@logic/performance-comparison/performanceAnalysis";

export default async function executeMeasurementInVm({
  javascriptCode,
  wasmBuffer,
  extractedJsFuncName,
  args,
}) {
  const wasmInstance = await createWasmInstance(wasmBuffer);
  const jsFunc = generateJsCode(javascriptCode, extractedJsFuncName);

  const scriptSource = `
    var measurementResults = (async () => {
      return await getPerformanceResultsByFunc({wasmFn, jsFn, args});
    })();
  `;

  const scriptCode = new vm.Script(scriptSource);
  const sandboxEnv = {
    getPerformanceResultsByFunc,
    measurePerformance,
    args,
    wasmFn: wasmInstance[extractedJsFuncName],
    jsFn: jsFunc,
  };

  let executionContext = vm.createContext(sandboxEnv);
  scriptCode.runInContext(executionContext);

  const { measurementResults } = executionContext;

  executionContext = null;

  return await measurementResults;
}
