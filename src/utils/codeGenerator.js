import vm from "vm";

export function generateJsCode(stringJsCode, extractedJsFuncName) {
  const context = {};
  vm.createContext(context);
  vm.runInContext(stringJsCode, context);

  return context[extractedJsFuncName];
}
