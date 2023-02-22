"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const env_1 = require("utils/env");
dotenv_1.default.config({ path: path_1.default.join(process.cwd(), ".env.example") });
const PORT = (0, env_1.env)("PORT", 1000);
const MONGO_CONNECTION_URI = (0, env_1.env)("MONGO_CONNECTION_URI", "");
const JWT_SECRET = (0, env_1.env)("JWT_SECRET", "JWT_SECRET");
const HASH_SALT = Number((0, env_1.env)("HASH_SALT", 10));
const SMTP_HOST = String((0, env_1.env)("SMTP_HOST"));
const SMTP_PORT = Number((0, env_1.env)("SMTP_PORT"));
const SMTP_USERNAME = String((0, env_1.env)("SMTP_USERNAME"));
const SMTP_PASSWORD = String((0, env_1.env)("SMTP_PASSWORD"));
const CLIENT_SERVER = String((0, env_1.env)("CLIENT_SERVER"));
exports.config = {
    PORT,
    MONGO_CONNECTION_URI,
    JWT_SECRET,
    HASH_SALT,
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USERNAME,
    SMTP_PASSWORD,
    CLIENT_SERVER,
};
//# sourceMappingURL=index.js.map