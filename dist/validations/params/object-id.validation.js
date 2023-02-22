"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.objectIdValidation = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const utils_1 = require("utils");
const objectIdValidation = ({ id, name, }) => {
    const isValid = mongoose_1.default.Types.ObjectId.isValid(id);
    if (!isValid)
        throw new utils_1.BadRequestException(`${name} not valid`);
};
exports.objectIdValidation = objectIdValidation;
//# sourceMappingURL=object-id.validation.js.map