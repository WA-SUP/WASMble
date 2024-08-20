import generate from "@babel/generator";

import { assignFunctionTypes } from "@logic/ast-analysis/typeInference";
import parseJscodeToAST from "@utils/jsToAstParser";

describe("assignFunctionTypes", () => {
  it("매개변수와 리턴타입에 올바른 타입 주석이 추가되어야 한다.", () => {
    const userFunction = `
      function userCode(a, b, c) {
        return a + b + c;
      }
    `;
    const userFunctionArguments = [1, 2, 3];
    const userReturnValue = 6;
    const ast = parseJscodeToAST(userFunction);

    const resultAst = assignFunctionTypes(
      ast,
      userFunctionArguments,
      userReturnValue,
    );
    const { code } = generate(resultAst, {}, userFunction);

    const expectCode = `function userCode(a: i32, b: i32, c: i32): i32 {
  return a + b + c;
}`;

    expect(code).toEqual(expectCode);
  });

  it("배열 타입의 매개변수에 올바른 타입 주석이 추가되어야 한다.", () => {
    const userFunction = `
      function userCode(arr) {
        return arr;
      }
    `;
    const userFunctionArguments = [[1, 2, 3]];
    const userReturnValue = [1, 2, 3];
    const ast = parseJscodeToAST(userFunction);

    const resultAst = assignFunctionTypes(
      ast,
      userFunctionArguments,
      userReturnValue,
    );
    const { code } = generate(resultAst, {}, userFunction);

    const expectCode = `function userCode(arr: Int32Array): Int32Array {
  return arr;
}`;

    expect(code).toEqual(expectCode);
  });

  it("다양한 타입의 매개변수에 올바른 타입 주석이 추가되어야 한다.", () => {
    const userFunction = `
      function userCode(a, b, c) {
        return a;
      }
    `;
    const userFunctionArguments = [1, [1, 2, 3], "hi"];
    const userReturnValue = 1;
    const ast = parseJscodeToAST(userFunction);

    const resultAst = assignFunctionTypes(
      ast,
      userFunctionArguments,
      userReturnValue,
    );
    const { code } = generate(resultAst, {}, userFunction);

    const expectCode = `function userCode(a: i32, b: Int32Array, c: string): i32 {
  return a;
}`;

    expect(code).toEqual(expectCode);
  });
});
