import traverse from "@babel/traverse";
import * as t from "@babel/types";

export function assignFunctionTypes(
  ast,
  userFunctionArguments,
  userReturnValue,
) {
  const resultAst = ast;

  traverse(resultAst, {
    FunctionDeclaration(path) {
      path.node.params.forEach((param, index) => {
        if (t.isIdentifier(param)) {
          param.typeAnnotation = t.tsTypeAnnotation(
            inferType(userFunctionArguments[index]),
          );
        }
      });

      path.node.returnType = t.tsTypeAnnotation(inferType(userReturnValue));
    },
  });

  return resultAst;
}

function inferType(value) {
  if (Array.isArray(value)) {
    const elementType =
      typeof value[0] === "string" ? t.tsStringKeyword() : t.tsNumberKeyword();

    return t.tsArrayType(elementType);
  } else if (typeof value === "string") {
    return t.tsStringKeyword();
  } else if (typeof value === "number") {
    return t.tsNumberKeyword();
  } else if (typeof value === "boolean") {
    return t.tsBooleanKeyword();
  }

  return t.tsAnyKeyword();
}
