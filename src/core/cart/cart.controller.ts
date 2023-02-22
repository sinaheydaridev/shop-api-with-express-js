import { NextFunction } from "express-serve-static-core";

import {
  ApplicationRequest,
  ApplicationResponse,
} from "interfaces/application.interface";

export default class CartController {
  async cart(
    req: ApplicationRequest,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    return;
  }

  async addToCart(
    req: ApplicationRequest,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    return;
  }

  async removeFromCart(
    req: ApplicationRequest,
    res: ApplicationResponse<{ token: string }>,
    next: NextFunction
  ) {
    return;
  }
}
