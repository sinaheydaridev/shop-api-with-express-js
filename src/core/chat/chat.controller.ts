import { NextFunction } from "express-serve-static-core";

import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";

export default class ChatController {
  async messages(
    req: ApplicationRequest,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    return;
  }
}
