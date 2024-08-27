import ApiError from "@logic/api-error/performanceComparison";
import * as parser from "@babel/parser";

export default function parseJscodeToAST(functionCode) {
  try {
    const ast = parser.parse(functionCode, {
      sourceType: "script",
    });

    return ast;
  } catch (error) {
    throw new ApiError("ast 파싱 에러", 400, error.message);
  }
}
