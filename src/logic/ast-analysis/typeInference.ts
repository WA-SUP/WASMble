import traverse, { NodePath } from "@babel/traverse";
import * as t from "@babel/types";
import ApiError from "@logic/api-error/performanceComparison";
import { ERROR_CASE } from "@constants/apiErrorType";

export default function assignFunctionTypes<T>(
  ast: t.File,
  functionArguments: (string | number | boolean | null | undefined)[],
  userCodeResult: T,
): t.File {
  try {
    traverse(ast, {
      FunctionDeclaration(path: NodePath<t.FunctionDeclaration>) {
        path.node.params.forEach((param, index) => {
          if (t.isIdentifier(param)) {
            const inferredType = inferType(functionArguments[index]);
            if (inferredType) {
              param.typeAnnotation = t.tsTypeAnnotation(inferredType);
            }
          }
        });

        const inferredType = inferType(userCodeResult);
        path.node.returnType = t.tsTypeAnnotation(
          inferredType ?? t.tsVoidKeyword(),
        );
      },
    });
  } catch {
    throw new ApiError(ERROR_CASE.TYPE_INFERENCE_ERROR);
  }

  return ast;
}

function inferType<T>(value: T): t.TSType {
  if (typeof value === "number") return t.tsTypeReference(t.identifier("i32"));
  if (typeof value === "string") return t.tsStringKeyword();
  if (typeof value === "boolean") return t.tsBooleanKeyword();
  return t.tsAnyKeyword();
}
