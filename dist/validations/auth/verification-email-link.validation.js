"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verificationEmailLinkValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const verificationEmailLinkValidation = (body) => {
    return joi_1.default
        .object({
        email: joi_1.default.string().email().trim(true).required(),
    })
        .validate(body);
};
exports.verificationEmailLinkValidation = verificationEmailLinkValidation;
//# sourceMappingURL=verification-email-link.validation.js.map