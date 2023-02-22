"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const utils_1 = require("utils");
exports.default = new (class uploadService {
    getFile(req) {
        const filename = req.params.filename;
        const filePath = path_1.default.join(process.cwd(), "uploads", filename);
        if (!fs_1.default.existsSync(filePath))
            throw new utils_1.NotFoundException();
        const readStream = fs_1.default.createReadStream(filePath);
        return readStream;
        // TODO: Add AWS bucket
    }
})();
//# sourceMappingURL=upload.service.js.map