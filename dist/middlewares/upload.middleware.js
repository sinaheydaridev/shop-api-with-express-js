"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerUploadFile = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const multer_1 = __importDefault(require("multer"));
const fileSize = 10 * 1000000; // 10MB
const filePath = path_1.default.join(process.cwd(), "uploads"); // root-dir/uploads
/** Storage */
const storage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, filePath);
    },
    filename: (_req, file, cb) => {
        const fileName = `${Date.now()}${path_1.default.extname(file.originalname)}`;
        cb(null, fileName);
    },
});
/** Filters */
const fileFilter = (_req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path_1.default.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (!fs_1.default.existsSync(filePath)) {
        fs_1.default.mkdir(filePath, (error) => {
            if (error) {
                console.log(error);
            }
        });
    }
    if (!extname || !mimetype) {
        cb(new multer_1.default.MulterError("LIMIT_UNEXPECTED_FILE"));
    }
    else {
        cb(null, true);
    }
};
/** Upload */
exports.multerUploadFile = (0, multer_1.default)({
    storage,
    fileFilter,
    limits: { fileSize },
}).single("file");
//# sourceMappingURL=upload.middleware.js.map