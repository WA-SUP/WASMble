import * as parser from "@babel/parser";
import * as t from "@babel/types";

import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default function parseJscodeToAST(functionCode: string): t.File {
  try {
    return parser.parse(functionCode, {
      sourceType: "script",
    }) as t.File;
  } catch {
    throw new ApiError(ERROR_CASE.AST_PARSING_ERROR);
  }
}
