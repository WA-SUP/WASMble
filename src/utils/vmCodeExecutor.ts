import ivm from "isolated-vm";
import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default async function executeVmCode<T>(
  userFunctionCode: string,
  userFunctionCall: string,
): Promise<T> {
  const isolatedVm = new ivm.Isolate({ memoryLimit: 128 });
  const timeoutLimit = 1000;

  try {
    const context: ivm.Context = await isolatedVm.createContext();
    const script: ivm.Script = await isolatedVm.compileScript(
      userFunctionCode + userFunctionCall,
    );
    const result: ivm.Reference<unknown> = await script.run(context, {
      timeout: timeoutLimit,
      release: true,
    });

    return result as T;
  } catch (error) {
    throw new ApiError(
      ERROR_CASE.EXECUTION_FAULT,
      error instanceof Error ? error.message : "Unknown error",
    );
  } finally {
    isolatedVm.dispose();
  }
}
