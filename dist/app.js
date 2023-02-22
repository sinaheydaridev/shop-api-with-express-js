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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const morgan_1 = __importDefault(require("morgan"));
const config_1 = require("config");
const database_1 = require("internal/database");
const swagger_json_1 = __importDefault(require("./swagger.json"));
const api_error_middleware_1 = require("middlewares/api-error.middleware");
const socket_1 = require("socket");
const core_1 = __importDefault(require("core"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.http = this.getHttp();
        this.socket = new socket_1.Socket(this.http);
        this.init();
    }
    listen() {
        this.http.listen(config_1.config.PORT, () => {
            console.log(`🚀 Server ready at http://localhost:${config_1.config.PORT}`);
        });
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.setupMiddlewares();
            this.setupLogger();
            this.setupSocket();
            this.docsSetup();
            this.setupRoutes();
            this.setupApiError();
            this.setup404Page();
        });
    }
    docsSetup() {
        this.app.use("/docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_json_1.default, {
            swaggerOptions: { persistAuthorization: true },
        }));
    }
    setupMiddlewares() {
        this.app.use(express_1.default.json({ limit: "10MB", strict: true }));
        this.app.use(express_1.default.urlencoded({ extended: false }));
        this.app.use((0, cors_1.default)({
            origin: "*",
        }));
    }
    setup404Page() {
        this.app.use(api_error_middleware_1.pageNotFound);
    }
    setupRoutes() {
        core_1.default.forEach(({ path, routes }) => {
            this.app.use(path, routes);
        });
    }
    setupApiError() {
        this.app.use(api_error_middleware_1.apiError);
    }
    setupSocket() {
        this.app.use((req, _req, next) => {
            req.io = this.socket.io;
            next();
        });
    }
    setupLogger() {
        const accessLogStream = fs_1.default.createWriteStream(path_1.default.join(process.cwd(), "logs", "access.log"), { flags: "a" });
        this.app.use((0, morgan_1.default)("combined", { stream: accessLogStream }));
    }
    setupDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield (0, database_1.mongoConnect)();
        });
    }
    getHttp() {
        return http_1.default.createServer(this.app);
    }
}
exports.default = App;
//# sourceMappingURL=app.js.map