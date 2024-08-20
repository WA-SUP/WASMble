import validateArgsLength from "@/logic/ast-analysis/validateArgsLength";
import parseJscodeToAST from "@/utils/jsToAstParser";

describe("validateArgsLength", () => {
  const request = {
    body: {
      functionCode: "function add(a, b) { return a + b; }",
      functionArguments: ["1", "2"],
    },
  };

  it("입력한 함수의 매개변수 수와 입력한 인자의 수가 같아야 한다.", () => {
    const { functionCode, functionArguments } = request.body;
    const ast = parseJscodeToAST(functionCode);
    const result = validateArgsLength(ast, functionArguments);

    expect(result).toEqual(true);
  });

  it("입력한 함수의 매개변수 수와 입력한 인자의 수가 같지 않은 경우 에러를 반환한다.", () => {
    request.body.functionArguments = ["1", "2", "3", "4", "5"];

    const { functionCode, functionArguments } = request.body;
    const ast = parseJscodeToAST(functionCode);
    const functionParams = ast.program.body[0].params;

    expect(() => validateArgsLength(ast, functionArguments)).toThrow(
      `함수의 매개변수 개수(${functionParams.length})와 입력된 인자의 개수(${functionArguments.length})가 일치하지 않습니다.`,
    );
  });
});
