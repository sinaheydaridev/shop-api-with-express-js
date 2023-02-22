"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const createUserValidation = (body) => {
    return joi_1.default
        .object({
        username: joi_1.default.string().alphanum().min(3).max(25).trim(true).required(),
        email: joi_1.default.string().email().trim(true).required(),
        password: joi_1.default.string().min(8).trim(true).required(),
        mobileNumber: joi_1.default.string().length(10).required(),
        // .pattern(/[6-9]{1}[0-9]{9}/)
        // .required(),
        birthYear: joi_1.default.number().integer().min(1920).max(2000),
        skillSet: joi_1.default
            .array()
            .items(joi_1.default.string().alphanum().trim(true))
            .default([]),
        is_active: joi_1.default.boolean().default(true),
    })
        .validate(body);
};
exports.default = createUserValidation;
//# sourceMappingURL=user.create.validation.js.map