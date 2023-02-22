"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("core/chat/chat.controller"));
class ChatRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.chatController = new chat_controller_1.default();
    }
    routes() {
        this.router.get("", this.chatController.messages);
        return this.router;
    }
}
exports.ChatRoutes = ChatRoutes;
//# sourceMappingURL=chat.routes.js.map