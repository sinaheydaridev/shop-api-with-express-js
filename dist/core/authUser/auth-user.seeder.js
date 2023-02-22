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
exports.createUserSeedData = void 0;
const enums_1 = require("enums");
const user_model_1 = __importDefault(require("models/user.model"));
const password_1 = require("utils/password");
const createUserSeedData = () => __awaiter(void 0, void 0, void 0, function* () {
    yield user_model_1.default.create({
        email: "test@test.com",
        username: "superuser",
        password: yield (0, password_1.hashPassword)("12345678"),
        mobileNumber: "1234567890",
        birthYear: 1950,
        skillSet: [],
        gender: enums_1.Gender.Male,
        isVerifyEmail: true,
        profileImage: "upload",
    });
});
exports.createUserSeedData = createUserSeedData;
//# sourceMappingURL=auth-user.seeder.js.map