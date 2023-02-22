"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UploadRoutes = void 0;
const express_1 = require("express");
const upload_controller_1 = __importDefault(require("core/upload/upload.controller"));
class UploadRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.uploadController = new upload_controller_1.default();
    }
    routes() {
        this.router.get("/:filename", this.uploadController.getFile);
        return this.router;
    }
}
exports.UploadRoutes = UploadRoutes;
//# sourceMappingURL=upload.routes.js.map