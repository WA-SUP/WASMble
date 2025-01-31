import * as parser from "@babel/parser";

import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default function parseJscodeToAST(functionCode) {
  try {
    const ast = parser.parse(functionCode, {
      sourceType: "script",
    });

    return ast;
  } catch {
    throw new ApiError(ERROR_CASE.AST_PARSING_ERROR);
  }
}
