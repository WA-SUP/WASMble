import parseJscodeToAST from "./jsToAstParser";

describe("parseJscodeToAST", () => {
  it("유효한 함수 코드로 AST 트리가 성공적으로 생성되어야 합니다.", () => {
    const request = {
      body: {
        functionCode: "function add(a, b) { return a + b; }",
      },
    };

    const result = parseJscodeToAST(request);

    expect(result).toHaveProperty("type", "File");
    expect(result).toHaveProperty("program");
    expect(result).toHaveProperty("start");
  });
});
