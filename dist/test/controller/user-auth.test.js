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
const app_1 = __importDefault(require("app"));
const supertest_1 = __importDefault(require("supertest"));
const user_model_1 = __importDefault(require("models/user.model"));
const database_1 = require("internal/database");
const utils_1 = require("utils");
const enums_1 = require("enums");
describe("User Auth Controller", () => {
    let app;
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = new app_1.default();
        yield (0, database_1.mongoConnect)();
        yield (0, database_1.mongoDrop)();
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, database_1.mongoClose)();
    }));
    it("POST /login (status:200)", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield user_model_1.default.create({
            email: "test2@test.com",
            username: "superuser2",
            password: yield (0, utils_1.hashPassword)("12345678"),
            mobileNumber: "1234567890",
            birthYear: 1950,
            skillSet: [],
            gender: enums_1.Gender.Male,
            isVerifyEmail: true,
            profileImage: "upload",
        });
        const body = {
            email: user.email,
            password: "12345678",
        };
        const response = yield (0, supertest_1.default)(app.getHttp())
            .post("/auth/login")
            .send(body);
        expect(response.status).toBe(200);
        expect(response.body.token).not.toBeNull();
    }));
});
// expect(undefined).toBeTruthy(); // این میاد چک میکنه مقداری که بهش میدیم مخالف تعریف نشده باشه
//# sourceMappingURL=user-auth.test.js.map