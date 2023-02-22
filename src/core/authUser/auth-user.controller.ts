import { NextFunction } from "express-serve-static-core";

import userAuthService from "core/authUser/auth-user.service";

import { createdResponse, okResponse } from "utils";

import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";
import { RequestWithUser } from "interfaces/custom-request.interface";

import { IUser } from "models/user.model";

import {
  LoginBody,
  RegisterBody,
  ForgetPasswordBody,
  ResetPasswordBody,
  VerificationEmailLinkBody,
} from "validations/auth";
import { ChangePasswordBody } from "validations/auth/change-password.validation";

export default class AuthUserController {
  async register(
    req: ApplicationRequest<{}, RegisterBody>,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    try {
      const token = await userAuthService.register(req.body);
      return createdResponse(res, { token });
    } catch (err) {
      next(err);
    }
  }

  async login(
    req: ApplicationRequest<{}, LoginBody>,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    try {
      const token = await userAuthService.login(req.body);
      return okResponse(res, { token });
    } catch (err) {
      next(err);
    }
  }

  async profile(req: RequestWithUser, res: ApplicationResponse<IUser | null>) {
    const userData = req.user!;
    const user = await userAuthService.profile(userData);
    return okResponse(res, user);
  }

  async changeProfileImage(
    req: RequestWithUser,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      const user = req.user!;
      await userAuthService.changeProfileImage(user._id, { file: req.file });
      return okResponse(res, { message: "Profile image updated successfully" });
    } catch (err) {
      next(err);
    }
  }

  async forgetPassword(
    req: ApplicationRequest<{}, ForgetPasswordBody>,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      await userAuthService.forgetPassword(req.body);
      return okResponse(res, {
        message: "We sent reset password link, please check your email",
      });
    } catch (err) {
      next(err);
    }
  }

  async resetPassword(
    req: ApplicationRequest<{}, ResetPasswordBody>,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      await userAuthService.resetPassword(req.body);
      return okResponse(res, {
        message: "Password reset successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async changePassword(
    req: RequestWithUser<{}, ChangePasswordBody>,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      const user = req.user!;
      await userAuthService.changePassword(user._id, req.body);
      return okResponse(res, {
        message: "Password changed Successfully",
      });
    } catch (err) {
      next(err);
    }
  }

  async verificationEmailLink(
    req: ApplicationRequest<{}, VerificationEmailLinkBody>,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      await userAuthService.verificationEmailLink(req.body);
      return okResponse(res, {
        message: "We sent email verification link, please check your email",
      });
    } catch (err) {
      next(err);
    }
  }

  async verificationEmail(
    req: ApplicationRequest<{}, ResetPasswordBody>,
    res: ApplicationResponse<{ message: string }>,
    next: NextFunction
  ) {
    try {
      await userAuthService.verificationEmail(req.body);
      return okResponse(res, {
        message: "Email verify Successfully",
      });
    } catch (err) {
      next(err);
    }
  }
}
