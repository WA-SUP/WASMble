export const ERROR_CASE = {
  MISSING_REQUEST: {
    message: "요청 바디에 필수 정보가 누락되었습니다.",
    statusCode: 400,
  },
  EXECUTION_FAULT: {
    message: "Javascript 함수 실행 실패",
    statusCode: 400,
  },
  AST_PARSING_ERROR: {
    message: "AST 파싱 에러",
    statusCode: 400,
  },
  INVALID_ARGUMENTS_COUNT: {
    message: "함수의 매개변수와 인수의 개수가 일치하지 않습니다.",
    statusCode: 400,
  },
  TYPE_INFERENCE_ERROR: {
    message: "객체와 배열타입은 지원되지 않습니다.",
    statusCode: 400,
  },
  INVALID_ARGUMENTS_TYPE: {
    message: "함수 인수는 문자열 또는 숫자여야 합니다.",
    statusCode: 400,
  },
} as const;

export type ErrorCaseType = keyof typeof ERROR_CASE;
