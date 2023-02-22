"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const resetPasswordValidation = (body) => {
    return joi_1.default
        .object({
        token: joi_1.default.string().trim(true).required(),
        userId: joi_1.default.string().trim(true).required(),
        password: joi_1.default.string().min(8).trim(true).required(),
    })
        .validate(body);
};
exports.resetPasswordValidation = resetPasswordValidation;
//# sourceMappingURL=reset-password.validation.js.map