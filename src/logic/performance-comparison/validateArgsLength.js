export default function validateArgsLength(ast, functionArguments) {
  try {
    const functionDeclaration = ast.program.body.find(
      (node) => node.type === "FunctionDeclaration",
    );

    const functionParams = functionDeclaration.params.map(
      (param) => param.name,
    );

    if (functionParams.length !== functionArguments.length) {
      throw new Error(
        `함수의 매개변수 개수(${functionParams.length})와 입력된 인자의 개수(${functionArguments.length})가 일치하지 않습니다.`,
      );
    }

    return true;
  } catch (error) {
    throw error;
  }
}
