import vm from "vm";

export function generateJsCode(
  stringJsCode: string,
  extractedJsFuncName: string,
): (...args: (string | number | boolean | null)[]) => unknown {
  const context: Record<string, unknown> = {};
  vm.createContext(context);
  vm.runInContext(stringJsCode, context);

  const extractedFunction = context[extractedJsFuncName];

  if (typeof extractedFunction !== "function") {
    throw new Error(
      ` ${extractedJsFuncName}함수가 정의되지 않았거나 유효한 함수가 아닙니다.`,
    );
  }

  return extractedFunction as (
    ...args: (string | number | boolean | null)[]
  ) => unknown;
}
