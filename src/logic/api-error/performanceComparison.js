export default class ApiError extends Error {
  constructor(type, errorStackMessage = "") {
    super(type.message);
    this.name = this.constructor.name;
    this.status = type.statusCode;
    this.errorStackMessage = errorStackMessage;
  }
}
