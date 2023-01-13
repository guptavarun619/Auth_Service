const AppError = require("./error-handler");
const { StatusCodes } = require("http-status-codes");

class ClientError extends AppError {
  constructor(name, explaination, message, statusCode) {
    super(name, message, explaination, statusCode);
  }
}

module.exports = ClientError;
