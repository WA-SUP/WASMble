import * as t from "@babel/types";
import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

interface AST {
  program: {
    body: t.Statement[];
  };
}

export default function validateArgsLength(
  ast: AST,
  functionArguments: (string | number | boolean | null | undefined)[],
): boolean {
  try {
    const functionDeclaration = ast.program.body.find(
      (node): node is t.FunctionDeclaration => t.isFunctionDeclaration(node),
    );

    if (!functionDeclaration || !functionDeclaration.params) {
      throw new ApiError(ERROR_CASE.INVALID_ARGUMENTS_COUNT);
    }

    const functionParams = functionDeclaration.params
      .map((param) => (t.isIdentifier(param) ? param.name : null))
      .filter((name): name is string => name !== null);

    if (functionParams.length !== functionArguments.length) {
      throw new ApiError(ERROR_CASE.INVALID_ARGUMENTS_COUNT);
    }

    return true;
  } catch (error) {
    throw error;
  }
}
