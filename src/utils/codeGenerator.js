import vm from "vm";

export function generateJsCode(stringJsCode) {
  const context = {};
  vm.createContext(context);
  vm.runInContext(stringJsCode, context);

  return context;
}
