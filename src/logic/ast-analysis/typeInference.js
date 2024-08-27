import traverse from "@babel/traverse";
import * as t from "@babel/types";

import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@/constants/apiErrorType";

export default function assignFunctionTypes(
  ast,
  functionArguments,
  userCodeResult,
) {
  const resultAst = ast;

  try {
    traverse.default(resultAst, {
      FunctionDeclaration(path) {
        path.node.params.forEach((param, index) => {
          if (t.isIdentifier(param)) {
            const inferredType = inferType(functionArguments[index]);
            if (inferredType) {
              param.typeAnnotation = t.tsTypeAnnotation(inferredType);
            }
          }
        });

        const inferredType = inferType(userCodeResult);
        if (inferredType) {
          path.node.returnType = t.tsTypeAnnotation(inferredType);
        } else {
          path.node.returnType = t.tsTypeAnnotation(t.tsVoidKeyword());
        }
      },

      VariableDeclarator(path) {
        const { id, init } = path.node;

        if (t.isIdentifier(id)) {
          t.isArrayExpression(init);
          const inferredType = inferType(init.value);
          if (inferredType) {
            id.typeAnnotation = t.tsTypeAnnotation(inferredType);
          }
        }
      },
    });
  } catch {
    throw new ApiError(ERROR_CASE.TYPE_INFERENCE_ERROR);
  }

  return resultAst;
}

function inferType(value) {
  if (Array.isArray(value)) {
    if (typeof value[0] === "string") {
      return t.tsArrayType(t.tsStringKeyword());
    } else if (typeof value[0] === "number") {
      return t.tsTypeReference(t.identifier("Int32Array"));
    }
  } else if (typeof value === "string") {
    return t.tsStringKeyword();
  } else if (typeof value === "number") {
    return t.tsTypeReference(t.identifier("i32"));
  } else if (typeof value === "boolean") {
    return t.tsBooleanKeyword();
  }
}
