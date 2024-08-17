import * as parser from "@babel/parser";

export default function parseJscodeToAST(functionCode) {
  try {
    const ast = parser.parse(functionCode, {
      sourceType: "script",
    });

    return ast;
  } catch (error) {
    return {
      message: "지원하지 않는 변수의 타입입니다.",
      errorStackMessage: error.message,
    };
  }
}
