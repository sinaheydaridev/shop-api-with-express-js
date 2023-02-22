import fs from "fs";
import path from "path";
import multer from "multer";

const fileSize = 10 * 1000000; // 10MB
const filePath = path.join(process.cwd(), "uploads"); // root-dir/uploads

/** Storage */
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, filePath);
  },
  filename: (_req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)}`;
    cb(null, fileName);
  },
});

/** Filters */
const fileFilter = (
  _req: unknown,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const filetypes = /jpeg|jpg|png|gif/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);
  if (!fs.existsSync(filePath)) {
    fs.mkdir(filePath, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
  if (!extname || !mimetype) {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"));
  } else {
    cb(null, true);
  }
};

/** Upload */
export const multerUploadFile = multer({
  storage,
  fileFilter,
  limits: { fileSize },
}).single("file");
