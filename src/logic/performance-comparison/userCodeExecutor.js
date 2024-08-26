import executeVmCode from "@utils/vmCodeExecutor";

export default async function executeUserCode(functionCode, functionArguments) {
  const userResult = await executeVmCode(functionCode, functionArguments);

  if (!functionCode || !functionArguments) {
    return { errorMessage: "올바르지 않은 요청입니다." };
  }

  return userResult;
}
