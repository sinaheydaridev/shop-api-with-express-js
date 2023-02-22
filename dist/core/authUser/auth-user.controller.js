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
const auth_user_service_1 = __importDefault(require("core/authUser/auth-user.service"));
const utils_1 = require("utils");
class AuthUserController {
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield auth_user_service_1.default.register(req.body);
                return (0, utils_1.createdResponse)(res, { token });
            }
            catch (err) {
                next(err);
            }
        });
    }
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const token = yield auth_user_service_1.default.login(req.body);
                return (0, utils_1.okResponse)(res, { token });
            }
            catch (err) {
                next(err);
            }
        });
    }
    profile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userData = req.user;
            const user = yield auth_user_service_1.default.profile(userData);
            return (0, utils_1.okResponse)(res, user);
        });
    }
    changeProfileImage(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield auth_user_service_1.default.changeProfileImage(user._id, { file: req.file });
                return (0, utils_1.okResponse)(res, { message: "Profile image updated successfully" });
            }
            catch (err) {
                next(err);
            }
        });
    }
    forgetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_user_service_1.default.forgetPassword(req.body);
                return (0, utils_1.okResponse)(res, {
                    message: "We sent reset password link, please check your email",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    resetPassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_user_service_1.default.resetPassword(req.body);
                return (0, utils_1.okResponse)(res, {
                    message: "Password reset successfully",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    changePassword(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                yield auth_user_service_1.default.changePassword(user._id, req.body);
                return (0, utils_1.okResponse)(res, {
                    message: "Password changed Successfully",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    verificationEmailLink(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_user_service_1.default.verificationEmailLink(req.body);
                return (0, utils_1.okResponse)(res, {
                    message: "We sent email verification link, please check your email",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
    verificationEmail(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield auth_user_service_1.default.verificationEmail(req.body);
                return (0, utils_1.okResponse)(res, {
                    message: "Email verify Successfully",
                });
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = AuthUserController;
//# sourceMappingURL=auth-user.controller.js.map