import executeVmCode from "@utils/vmCodeExecutor";

export default async function executeUserCode(request) {
  const userFunctionCode = request.body.functionCode;
  const userFunctionArguments = request.body.functionArguments;

  const userResult = await executeVmCode(userFunctionCode);

  const isNotFunction = userFunctionCode.slice(0, 8) !== "function";

  if (!userFunctionCode || !userFunctionArguments || isNotFunction) {
    return { errorMessage: "올바르지 않은 요청입니다." };
  }

  return userResult;
}
