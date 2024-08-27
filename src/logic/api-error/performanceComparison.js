export default class ApiError extends Error {
  constructor(message, statusCode, errorStackMessage = "") {
    super(message);
    this.name = this.constructor.name;
    this.errorStackMessage = errorStackMessage;
    this.statusCode = statusCode;
  }
}
