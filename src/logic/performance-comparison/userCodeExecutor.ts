import executeVmCode from "@utils/vmCodeExecutor";
import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default async function executeUserCode(functionCode, functionArguments) {
  if (!functionCode || !functionArguments) {
    throw new ApiError(ERROR_CASE.MISSING_REQUEST);
  }

  const userResult = await executeVmCode(functionCode, functionArguments);

  return userResult;
}
