import executeVmCode from "@utils/vmCodeExecutor";
import ApiError from "@logic/api-error/performanceComparison";

export default async function executeUserCode(functionCode, functionArguments) {
  if (!functionCode || !functionArguments) {
    throw new ApiError("올바르지 않은 요청입니다.", 400);
  }

  const userResult = await executeVmCode(functionCode, functionArguments);

  return userResult;
}
