import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default function validateArgsLength(ast, functionArguments) {
  try {
    const functionDeclaration = ast.program.body.find(
      (node) => node.type === "FunctionDeclaration",
    );

    const functionParams = functionDeclaration.params.map(
      (param) => param.name,
    );

    if (functionParams.length !== functionArguments.length) {
      throw new ApiError(ERROR_CASE.INVALID_ARGUMENTS_COUNT);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
