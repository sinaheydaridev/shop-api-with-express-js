"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnauthorizedException = exports.NotFoundException = exports.PathNotFoundException = exports.BadRequestException = exports.ForbiddenException = exports.HttpException = void 0;
class HttpException {
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}
exports.HttpException = HttpException;
class ForbiddenException extends HttpException {
    constructor() {
        super(403, "Forbidden Resource");
    }
}
exports.ForbiddenException = ForbiddenException;
class BadRequestException extends HttpException {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}
exports.BadRequestException = BadRequestException;
class PathNotFoundException extends HttpException {
    constructor(path) {
        super(404, `Cannot Get ${path}`);
    }
}
exports.PathNotFoundException = PathNotFoundException;
class NotFoundException extends HttpException {
    constructor(message = "") {
        super(404, message);
    }
}
exports.NotFoundException = NotFoundException;
class UnauthorizedException extends HttpException {
    constructor() {
        super(401, "Not Authorized");
    }
}
exports.UnauthorizedException = UnauthorizedException;
//# sourceMappingURL=exceptions.js.map