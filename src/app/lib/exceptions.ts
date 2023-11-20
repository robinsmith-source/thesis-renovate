export class AuthRequiredError extends Error {
  constructor(message = "Authentication is required") {
    super(message);
    this.name = "AuthRequiredError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized access") {
    super(message);
    this.name = "UnauthorizedError";
  }
}

export class ValidationError extends Error {
  constructor(message = "Validation error") {
    super(message);
    this.name = "ValidationError";
  }
}

export class InternalServerError extends Error {
  constructor(message = "Internal server error") {
    super(message);
    this.name = "InternalServerError";
  }
}
