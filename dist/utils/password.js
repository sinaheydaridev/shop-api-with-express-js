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
exports.generatePasswordResetToken = exports.comparePassword = exports.hashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const config_1 = require("config");
const hashPassword = (plaintextPassword) => __awaiter(void 0, void 0, void 0, function* () {
    const hash = yield bcrypt_1.default.hash(plaintextPassword, config_1.config.HASH_SALT);
    return hash;
});
exports.hashPassword = hashPassword;
const comparePassword = (plainTextPassword, hash) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield bcrypt_1.default.compare(plainTextPassword, hash);
    return result;
});
exports.comparePassword = comparePassword;
const generatePasswordResetToken = () => __awaiter(void 0, void 0, void 0, function* () {
    const randomString = crypto_1.default.randomBytes(32).toString("hex");
    console.log(randomString, "randomString");
    const hash = yield bcrypt_1.default.hash(randomString, Number(config_1.config.HASH_SALT));
    console.log(hash, "hash");
    return hash;
});
exports.generatePasswordResetToken = generatePasswordResetToken;
//# sourceMappingURL=password.js.map