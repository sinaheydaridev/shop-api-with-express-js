import { NextFunction } from "express-serve-static-core";

import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";

import uploadService from "./upload.service";

export default class UserController {
  async getFile(
    req: ApplicationRequest<{ filename: string }>,
    res: ApplicationResponse,
    next: NextFunction
  ) {
    try {
      const readStream = uploadService.getFile(req);
      readStream.pipe(res);
    } catch (err) {
      next(err);
    }
  }
}
