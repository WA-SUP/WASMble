import parseJscodeToAST from "./jsToAstParser";

describe("parseJscodeToAST", () => {
  it("유효한 함수 코드로 AST 트리가 성공적으로 생성되어야 한다.", () => {
    const request = {
      body: {
        functionCode: "function add(a, b) { return a + b; }",
      },
    };

    const { functionCode } = request.body;
    const result = parseJscodeToAST(functionCode);

    expect(result).toHaveProperty("type", "File");
    expect(result).toHaveProperty("program");
    expect(result).toHaveProperty("start");
  });

  it("유효하지 않은 함수 코드의 경우 적절한 오류 메시지가 반환되어야 한다.", () => {
    const request = {
      body: {
        functionCode: "function add(a, b) { return a + ; }",
      },
    };

    const { functionCode } = request.body;
    const result = parseJscodeToAST(functionCode);

    expect(result).toHaveProperty("errorStackMessage");
  });
});
