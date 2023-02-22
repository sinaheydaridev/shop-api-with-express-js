import { NextFunction } from "express";

import { RequestWithUser } from "interfaces/custom-request.interface";
import User from "models/user.model";
import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from "utils/exceptions";
import { verifyToken } from "utils/token";

export const authentication = async (
  req: RequestWithUser<{}, {}>,
  _: unknown,
  next: NextFunction
) => {
  if (!req.headers["authorization"]) {
    return next(new UnauthorizedException());
  }
  if (!req.headers["authorization"].startsWith("Bearer")) {
    return next(new BadRequestException());
  }
  const accessToken = req.headers.authorization.split(" ")[1];
  try {
    const decoded = verifyToken(accessToken);
    const user = await User.findById(decoded.userId);
    if (user) {
      req.user = user;
      next();
    } else {
      return next(new ForbiddenException());
    }
  } catch {
    return next(new ForbiddenException());
  }
};
