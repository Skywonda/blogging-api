class AppError extends Error {
  constructor(message) {
    super(message);
  }
}

class BadRequestError extends AppError {
  statusCode = 400;
  constructor(message) {
    super(message);
  }
}

class NotFoundError extends AppError {
  statusCode = 404;
  constructor(message) {
    super(message);
  }
}

class ConflictError extends AppError {
  statusCode = 409;
  constructor(message) {
    super(message);
  }
}

class AuthenticationError extends AppError {
  statusCode = 401;
  constructor(message) {
    super(message);
  }
}

class AuthorizationError extends AppError {
  statusCode = 409;
  constructor(message) {
    super(message);
  }
}

module.exports = {
  BadRequestError,
  NotFoundError,
  ConflictError,
  AuthenticationError,
  AuthorizationError,
};
