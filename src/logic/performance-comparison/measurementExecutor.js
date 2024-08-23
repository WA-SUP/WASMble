import vm from "vm";

import { createWasmInstance } from "@utils/webAssemblyUtils";
import { generateJsCode } from "@utils/vmUtils";
import parseJscodeToAST from "@utils/jsToAstParser";

import {
  getPerformanceResult,
  measurePerformanceByFunc,
} from "@logic/performance-comparison/performanceAnalysis";

import getIdentifierNameListByFunc from "@logic/ast-analysis/getIdentifierNameList";

export default function executeMeasurementInVm({
  javascriptCode,
  assemblyScriptCode,
  args,
  repeatCount,
}) {
  const ELEMENT_TO_FILL = 0;

  const wasmInstance = createWasmInstance(assemblyScriptCode);
  const jsFunc = generateJsCode(javascriptCode);
  const executeFuncName = javascriptCode.match(/function (\w+)/)[1];

  const execStatementList = new Array(repeatCount)
    .fill(ELEMENT_TO_FILL)
    .map((_) => {
      return "getPerformanceResult({ jsFn, wasmFn, args })";
    });

  const code = `(async () => {
    return await Promise.allSettled([${execStatementList.join(",")}]);
  })();`;

  const script = new vm.Script(code);
  const context = {
    getPerformanceResult,
    measurePerformanceByFunc,
    args,
    wasmFn: wasmInstance[executeFuncName],
    jsFn: jsFunc,
  };
  vm.createContext(context);
  script.runInContext(context);
}
