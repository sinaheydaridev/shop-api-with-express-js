"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgetPasswordValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const forgetPasswordValidation = (body) => {
    return joi_1.default
        .object({
        email: joi_1.default.string().email().trim(true).required(),
    })
        .validate(body);
};
exports.forgetPasswordValidation = forgetPasswordValidation;
//# sourceMappingURL=forget-password.validation.js.map