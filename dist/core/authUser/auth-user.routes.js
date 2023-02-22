"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthUserRoutes = void 0;
const express_1 = require("express");
const auth_user_controller_1 = __importDefault(require("core/authUser/auth-user.controller"));
const upload_middleware_1 = require("middlewares/upload.middleware");
const authentication_middleware_1 = require("middlewares/authentication.middleware");
class AuthUserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.authUserController = new auth_user_controller_1.default();
    }
    routes() {
        this.router.post("/register", this.authUserController.register);
        this.router.post("/login", this.authUserController.login);
        this.router.get("/profile", authentication_middleware_1.authentication, this.authUserController.profile);
        this.router.put("/change-profile-image", authentication_middleware_1.authentication, upload_middleware_1.multerUploadFile, this.authUserController.changeProfileImage);
        this.router.post("/forget-password", this.authUserController.forgetPassword);
        this.router.put("/reset-password", this.authUserController.resetPassword);
        this.router.put("/change-password", authentication_middleware_1.authentication, this.authUserController.changePassword);
        this.router.post("/verification-email-link", this.authUserController.verificationEmailLink);
        this.router.post("/verification-email", this.authUserController.verificationEmail);
        return this.router;
    }
}
exports.AuthUserRoutes = AuthUserRoutes;
//# sourceMappingURL=auth-user.routes.js.map