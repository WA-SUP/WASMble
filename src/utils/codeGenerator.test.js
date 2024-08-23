import { generateJsCode } from "./codeGenerator";

describe("Generate JavaScript Code", () => {
  const targetStringCode = `
    function fibonacci(n) {
      if (n <= 1) return n;
      return fibonacci(n - 1) + fibonacci(n - 2);
    }
  `;

  it("문자열 형식의 JS코드를 기반으로 함수 생성하며 실제 함수처럼 동작해야합니다.", () => {
    const { fibonacci } = generateJsCode(targetStringCode);

    expect(fibonacci(1)).toBe(1);
    expect(fibonacci(5)).toBe(5);
    expect(fibonacci(10)).toBe(55);
  });
});
