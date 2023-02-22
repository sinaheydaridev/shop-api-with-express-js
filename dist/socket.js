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
exports.Socket = void 0;
const config_1 = require("config");
const user_model_1 = __importDefault(require("models/user.model"));
const socket_io_1 = require("socket.io");
const utils_1 = require("utils");
class Socket {
    constructor(server) {
        this.server = server;
        this.io = this.init();
        this.setupMiddlewares();
    }
    init() {
        const io = new socket_io_1.Server(this.server, {
            cors: {
                origin: config_1.config.CLIENT_SERVER,
                methods: ["GET", "POST"],
                allowedHeaders: ["authorization"], // for send from client
            },
        });
        return io;
    }
    setupMiddlewares() {
        this.io.use((socket, next) => __awaiter(this, void 0, void 0, function* () {
            const headers = socket.handshake.headers;
            if (!headers.authorization) {
                return next(new utils_1.ForbiddenException()); // send error to client
            }
            try {
                const decoded = (0, utils_1.verifyToken)(String(headers.authorization));
                yield user_model_1.default.findById(decoded.userId);
            }
            catch (_a) {
                return next(new utils_1.UnauthorizedException()); // send error to client
            }
            next();
        }));
    }
}
exports.Socket = Socket;
//# sourceMappingURL=socket.js.map