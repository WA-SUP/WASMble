import { ERROR_CASE, ErrorCaseType } from "@/constants/apiErrorType";

export default class ApiError extends Error {
  status: number;
  errorStackMessage: string;

  constructor(
    errorCase: (typeof ERROR_CASE)[ErrorCaseType],
    errorStackMessage = "",
  ) {
    super(errorCase.message);
    this.name = this.constructor.name;
    this.status = errorCase.statusCode;
    this.errorStackMessage = errorStackMessage;
  }
}
