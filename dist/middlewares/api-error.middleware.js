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
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageNotFound = exports.apiError = void 0;
const multer_1 = require("multer");
const apiError = (error, _req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    if (error instanceof multer_1.MulterError) {
        return res.status(413).json({ status: 413, message: error.message });
    }
    res
        .status(error.status || 500)
        .json({ status: error.status || 500, message: error.message });
});
exports.apiError = apiError;
const pageNotFound = (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    res
        .status(404)
        .send({ status: 404, message: `Cannot ${req.method} ${req.path}` });
});
exports.pageNotFound = pageNotFound;
//# sourceMappingURL=api-error.middleware.js.map