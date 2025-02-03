import vm from "vm";
import { createWasmInstance } from "@utils/webAssemblyUtils";
import { generateJsCode } from "@utils/codeGenerator";
import {
  getPerformanceResultsByFunc,
  measurePerformance,
} from "@logic/performance-comparison/performanceAnalysis";
import ApiError from "../api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

interface ExecuteMeasurementParams {
  javascriptCode: string;
  wasmBuffer: ArrayBuffer;
  extractedJsFuncName: string;
  args: (string | number | boolean | null | undefined)[];
}

interface MeasurementResult {
  type: string;
  operationTimes: number;
}

export default async function executeMeasurementInVm({
  javascriptCode,
  wasmBuffer,
  extractedJsFuncName,
  args,
}: ExecuteMeasurementParams): Promise<MeasurementResult[]> {
  try {
    const wasmInstance = await createWasmInstance(wasmBuffer);
    const jsFunc = generateJsCode(javascriptCode, extractedJsFuncName);

    const scriptSource = `
      var measurementResults = (async () => {
        return await getPerformanceResultsByFunc({ wasmFn, jsFn, args });
      })();
    `;

    const scriptCode = new vm.Script(scriptSource);
    const sandboxEnv = {
      getPerformanceResultsByFunc,
      measurePerformance,
      args,
      wasmFn: wasmInstance[extractedJsFuncName as keyof typeof wasmInstance],
      jsFn: jsFunc,
    };

    const executionContext = vm.createContext(sandboxEnv);
    scriptCode.runInContext(executionContext);

    const measurementResults = await (
      executionContext as { measurementResults: Promise<MeasurementResult[]> }
    ).measurementResults;

    return measurementResults;
  } catch (error) {
    throw new ApiError(
      ERROR_CASE.EXECUTION_FAULT,
      error instanceof Error ? error.message : "Unknown error",
    );
  }
}
