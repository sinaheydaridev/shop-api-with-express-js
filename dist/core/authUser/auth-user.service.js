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
const utils_1 = require("utils");
const auth_1 = require("validations/auth");
const user_model_1 = __importDefault(require("models/user.model"));
const token_model_1 = __importDefault(require("models/token.model"));
const helpers_1 = require("helpers");
exports.default = new (class authUserService {
    /** Login */
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.loginValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const user = yield user_model_1.default.findOne({ email: value.email });
            if (!user)
                throw new utils_1.BadRequestException("Invalid email or password");
            const isMatch = yield (0, utils_1.comparePassword)(value.password, user.password);
            if (!isMatch)
                throw new utils_1.BadRequestException("Invalid email or password");
            const token = (0, utils_1.generateToken)(user._id);
            return token;
        });
    }
    /** Register */
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.registerValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const userWithUsernameIsExists = yield user_model_1.default.findOne({
                username: value.username,
            });
            if (userWithUsernameIsExists)
                throw new utils_1.BadRequestException("Username is exists");
            const userWithEmailIsExists = yield user_model_1.default.findOne({ email: value.email });
            if (userWithEmailIsExists)
                throw new utils_1.BadRequestException("Email is exists");
            const user = yield user_model_1.default.create({
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
            const token = (0, utils_1.generateToken)(user._id);
            return token;
        });
    }
    /** Profile */
    profile(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne(data._id).select("-password");
        });
    }
    /** Reset Password Link */
    forgetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.forgetPasswordValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const user = yield user_model_1.default.findOne({ email: value.email });
            if (!user)
                throw new utils_1.BadRequestException("User not exists");
            const passwordReset = yield token_model_1.default.findOne({ userId: user._id });
            if (passwordReset)
                passwordReset.deleteOne();
            const token = yield (0, utils_1.generatePasswordResetToken)();
            yield token_model_1.default.create({
                userId: user._id,
                token,
            });
            yield (0, helpers_1.sendEmail)({
                subject: "Reset Password",
                to: value.email,
                template: "reset-password-link",
                context: {
                    username: user.username,
                    link: (0, helpers_1.generatePasswordResetLink)(token, user._id),
                },
            });
        });
    }
    /** Reset Password */
    resetPassword(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.resetPasswordValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const passwordReset = yield token_model_1.default.findOne({
                userId: value.userId,
            });
            if (!passwordReset)
                throw new utils_1.BadRequestException("Invalid token");
            const isMatch = (0, utils_1.comparePassword)(value.token, passwordReset.token);
            if (!isMatch)
                new utils_1.BadRequestException("Invalid token");
            yield user_model_1.default.updateOne({ _id: value.userId }, { $set: { password: yield (0, utils_1.hashPassword)(value.password) } });
            yield passwordReset.deleteOne();
        });
    }
    /** Change Password */
    changePassword(userId, body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.changePasswordValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const user = yield user_model_1.default.findById(userId);
            if (user) {
                const isMatch = yield (0, utils_1.comparePassword)(value.password, user.password);
                if (!isMatch)
                    throw new utils_1.BadRequestException("Invalid password");
                user.password = yield (0, utils_1.hashPassword)(value.newPassword);
                yield user.save();
            }
        });
    }
    /** Change Profile Image */
    changeProfileImage(userId, body) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.changeProfileImageValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            yield user_model_1.default.findByIdAndUpdate(userId, {
                $set: { profileImage: (_a = value.file) === null || _a === void 0 ? void 0 : _a.filename },
            });
        });
    }
    /** Verification Email Link */
    verificationEmailLink(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.verificationEmailLinkValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            const user = yield user_model_1.default.findOne({ email: value.email });
            if (!user)
                throw new utils_1.BadRequestException("User not exists");
            const token = (0, utils_1.generateToken)(user._id, "5m");
            yield (0, helpers_1.sendEmail)({
                subject: "Verify your email",
                to: value.email,
                template: "verification-email",
                context: {
                    username: user.username,
                    link: (0, helpers_1.generateVerificationEmailLink)(token),
                },
            });
        });
    }
    /** Verification Email */
    verificationEmail(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const { error, value } = (0, auth_1.verificationEmailValidation)(body);
            if (error)
                throw new utils_1.BadRequestException(error.message);
            try {
                const payload = (0, utils_1.verifyToken)(value.token);
                yield user_model_1.default.findByIdAndUpdate(payload.userId, {
                    $set: { isVerifyEmail: true },
                });
            }
            catch (_a) {
                throw new utils_1.BadRequestException("Invalid token");
            }
        });
    }
})();
//# sourceMappingURL=auth-user.service.js.map