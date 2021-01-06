import { ValidationError } from "express-validator";
import { CustomError } from "./custom-error";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  // NOTE: private errors => this.errors = errors 자동으로 처리됨
  constructor(public errors: ValidationError[]) {
    super("Invalid request parameters.");
  }

  serializeErrors() {
    return this.errors.map((err) => ({ message: err.msg, field: err.param }));
  }
}
