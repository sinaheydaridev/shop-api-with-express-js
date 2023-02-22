import { Schema } from "mongoose";

import {
  BadRequestException,
  generateToken,
  verifyToken,
  comparePassword,
  generatePasswordResetToken,
  hashPassword,
} from "utils";

import {
  ForgetPasswordBody,
  forgetPasswordValidation,
  LoginBody,
  loginValidation,
  RegisterBody,
  registerValidation,
  ResetPasswordBody,
  resetPasswordValidation,
  VerificationEmailBody,
  VerificationEmailLinkBody,
  verificationEmailLinkValidation,
  verificationEmailValidation,
  ChangePasswordBody,
  changePasswordValidation,
  ChangeProfileImageBody,
  changeProfileImageValidation,
} from "validations/auth";

import User, { IUser } from "models/user.model";
import Token from "models/token.model";

import {
  sendEmail,
  generatePasswordResetLink,
  generateVerificationEmailLink,
} from "helpers";

export default new (class authUserService {
  /** Login */

  async login(body: LoginBody) {
    const { error, value } = loginValidation(body);
    if (error) throw new BadRequestException(error.message);

    const user = await User.findOne({ email: value.email });
    if (!user) throw new BadRequestException("Invalid email or password");

    const isMatch = await comparePassword(value.password, user.password);
    if (!isMatch) throw new BadRequestException("Invalid email or password");

    const token = generateToken(user._id);
    return token;
  }

  /** Register */

  async register(body: RegisterBody) {
    const { error, value } = registerValidation(body);
    if (error) throw new BadRequestException(error.message);

    const userWithUsernameIsExists = await User.findOne({
      username: value.username,
    });

    if (userWithUsernameIsExists)
      throw new BadRequestException("Username is exists");

    const userWithEmailIsExists = await User.findOne({ email: value.email });
    if (userWithEmailIsExists) throw new BadRequestException("Email is exists");

    const user = await User.create({
      username: value.username,
      email: value.email,
      birthYear: value.birthYear,
      mobileNumber: value.mobileNumber,
      skillSet: value.skillSet,
      password: value.password,
      gender: value.gender,
      is_active: true,
      profileImage: "",
    });

    const token = generateToken(user._id);
    return token;
  }

  /** Profile */

  async profile(data: IUser) {
    return await User.findOne(data._id).select("-password");
  }

  /** Reset Password Link */

  async forgetPassword(body: ForgetPasswordBody) {
    const { error, value } = forgetPasswordValidation(body);
    if (error) throw new BadRequestException(error.message);

    const user = await User.findOne({ email: value.email });
    if (!user) throw new BadRequestException("User not exists");

    const passwordReset = await Token.findOne({ userId: user._id });
    if (passwordReset) passwordReset.deleteOne();

    const token = await generatePasswordResetToken();

    await Token.create({
      userId: user._id,
      token,
    });

    await sendEmail({
      subject: "Reset Password",
      to: value.email,
      template: "reset-password-link",
      context: {
        username: user.username,
        link: generatePasswordResetLink(token, user._id),
      },
    });
  }

  /** Reset Password */

  async resetPassword(body: ResetPasswordBody) {
    const { error, value } = resetPasswordValidation(body);
    if (error) throw new BadRequestException(error.message);

    const passwordReset = await Token.findOne({
      userId: value.userId,
    });
    if (!passwordReset) throw new BadRequestException("Invalid token");

    const isMatch = comparePassword(value.token, passwordReset.token);
    if (!isMatch) new BadRequestException("Invalid token");

    await User.updateOne(
      { _id: value.userId },
      { $set: { password: await hashPassword(value.password) } }
    );

    await passwordReset.deleteOne();
  }

  /** Change Password */

  async changePassword(
    userId: Schema.Types.ObjectId,
    body: ChangePasswordBody
  ) {
    const { error, value } = changePasswordValidation(body);
    if (error) throw new BadRequestException(error.message);

    const user = await User.findById(userId);

    if (user) {
      const isMatch = await comparePassword(value.password, user.password);
      if (!isMatch) throw new BadRequestException("Invalid password");

      user.password = await hashPassword(value.newPassword);
      await user.save();
    }
  }

  /** Change Profile Image */

  async changeProfileImage(
    userId: Schema.Types.ObjectId,
    body: ChangeProfileImageBody
  ) {
    const { error, value } = changeProfileImageValidation(body);
    if (error) throw new BadRequestException(error.message);
    await User.findByIdAndUpdate(userId, {
      $set: { profileImage: value.file?.filename },
    });
  }

  /** Verification Email Link */

  async verificationEmailLink(body: VerificationEmailLinkBody) {
    const { error, value } = verificationEmailLinkValidation(body);
    if (error) throw new BadRequestException(error.message);

    const user = await User.findOne({ email: value.email });
    if (!user) throw new BadRequestException("User not exists");

    const token = generateToken(user._id, "5m");

    await sendEmail({
      subject: "Verify your email",
      to: value.email,
      template: "verification-email",
      context: {
        username: user.username,
        link: generateVerificationEmailLink(token),
      },
    });
  }

  /** Verification Email */

  async verificationEmail(body: VerificationEmailBody) {
    const { error, value } = verificationEmailValidation(body);
    if (error) throw new BadRequestException(error.message);
    try {
      const payload = verifyToken(value.token);
      await User.findByIdAndUpdate(payload.userId, {
        $set: { isVerifyEmail: true },
      });
    } catch {
      throw new BadRequestException("Invalid token");
    }
  }
})();
