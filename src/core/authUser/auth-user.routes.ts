import { Router } from "express";

import AuthUserController from "core/authUser/auth-user.controller";

import { multerUploadFile } from "middlewares/upload.middleware";
import { authentication } from "middlewares/authentication.middleware";

export class AuthUserRoutes {
  private router: Router;
  private authUserController: AuthUserController;

  constructor() {
    this.router = Router();
    this.authUserController = new AuthUserController();
  }

  routes() {
    this.router.post("/register", this.authUserController.register);
    this.router.post("/login", this.authUserController.login);
    this.router.get(
      "/profile",
      authentication,
      this.authUserController.profile
    );
    this.router.put(
      "/change-profile-image",
      authentication,
      multerUploadFile,
      this.authUserController.changeProfileImage
    );
    this.router.post(
      "/forget-password",
      this.authUserController.forgetPassword
    );
    this.router.put("/reset-password", this.authUserController.resetPassword);
    this.router.put(
      "/change-password",
      authentication,
      this.authUserController.changePassword
    );
    this.router.post(
      "/verification-email-link",
      this.authUserController.verificationEmailLink
    );
    this.router.post(
      "/verification-email",
      this.authUserController.verificationEmail
    );
    return this.router;
  }
}
