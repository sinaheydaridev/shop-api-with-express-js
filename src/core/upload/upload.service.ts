import path from "path";
import fs from "fs";

import { ApplicationRequest } from "interfaces/application.interface";
import { NotFoundException } from "utils";

export default new (class uploadService {
  getFile(req: ApplicationRequest<{ filename: string }>) {
    const filename = req.params.filename;
    const filePath = path.join(process.cwd(), "uploads", filename);
    if (!fs.existsSync(filePath)) throw new NotFoundException();
    const readStream = fs.createReadStream(filePath);
    return readStream;
    // TODO: Add AWS bucket
  }
})();
