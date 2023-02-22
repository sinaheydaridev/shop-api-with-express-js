"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const changePasswordValidation = (body) => {
    return joi_1.default
        .object({
        password: joi_1.default.string().trim(true).min(8).required(),
        newPassword: joi_1.default.string().trim(true).min(8).required(),
    })
        .validate(body);
};
exports.changePasswordValidation = changePasswordValidation;
//# sourceMappingURL=change-password.validation.js.map