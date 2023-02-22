"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.changeProfileImageValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const changeProfileImageValidation = (body) => {
    return joi_1.default
        .object({
        file: joi_1.default.required(),
    })
        .validate(body);
};
exports.changeProfileImageValidation = changeProfileImageValidation;
//# sourceMappingURL=change-profile-image.validation.js.map