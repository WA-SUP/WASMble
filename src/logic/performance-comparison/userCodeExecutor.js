import executeVmCode from "@utils/vmCodeExecutor";

function validateErrorResult(userResult) {
  if (typeof userResult === "object") {
    return ["errorStackMessage", "message"].every((key) => {
      return Object.hasOwn(userResult, key);
    });
  }

  return false;
}

export default function executeUserCode(request) {
  const userFunctionCode = request.body.functionCode;
  const userFunctionArguments = request.body.functionArguments;

  const userResult = executeVmCode(userFunctionCode);

  const isNotFunction = userFunctionCode.slice(0, 8) !== "function";
  const isInvalidCode = validateErrorResult(userResult);

  if (!userFunctionCode || !userFunctionArguments || isNotFunction) {
    return NextResponse.json(
      { error: "올바르지 않은 요청입니다." },
      { status: 400 },
    );
  }

  if (isInvalidCode) {
    return NextResponse.json(userResult, { status: 200 });
  }

  return userResult;
}
