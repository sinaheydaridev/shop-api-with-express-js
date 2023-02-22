"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = void 0;
const user_model_1 = __importDefault(require("models/user.model"));
const exceptions_1 = require("utils/exceptions");
const token_1 = require("utils/token");
const authentication = (req, _, next) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.headers["authorization"]) {
        return next(new exceptions_1.UnauthorizedException());
    }
    if (!req.headers["authorization"].startsWith("Bearer")) {
        return next(new exceptions_1.BadRequestException());
    }
    const accessToken = req.headers.authorization.split(" ")[1];
    try {
        const decoded = (0, token_1.verifyToken)(accessToken);
        const user = yield user_model_1.default.findById(decoded.userId);
        if (user) {
            req.user = user;
            next();
        }
        else {
            return next(new exceptions_1.ForbiddenException());
        }
    }
    catch (_a) {
        return next(new exceptions_1.ForbiddenException());
    }
});
exports.authentication = authentication;
//# sourceMappingURL=authentication.middleware.js.map