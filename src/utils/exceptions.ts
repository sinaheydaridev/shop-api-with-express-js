export class HttpException {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}

export class ForbiddenException extends HttpException {
  constructor() {
    super(403, "Forbidden Resource");
  }
}

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request") {
    super(400, message);
  }
}

export class PathNotFoundException extends HttpException {
  constructor(path: string) {
    super(404, `Cannot Get ${path}`);
  }
}

export class NotFoundException extends HttpException {
  constructor(message: string = "") {
    super(404, message);
  }
}

export class UnauthorizedException extends HttpException {
  constructor() {
    super(401, "Not Authorized");
  }
}
