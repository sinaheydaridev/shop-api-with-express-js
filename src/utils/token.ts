import { Schema } from "mongoose";
import jwt from "jsonwebtoken";

import { config } from "../config";

type UserTokenPayload = {
  userId: Schema.Types.ObjectId;
};

export const generateToken = (
  userId: Schema.Types.ObjectId,
  expiresIn: string = "30d"
) => {
  const token = jwt.sign({ userId: userId }, config.JWT_SECRET as string, {
    expiresIn,
  });
  return token;
};

export const verifyToken = (token: string) => {
  const payload = jwt.verify(
    token,
    config.JWT_SECRET as string
  ) as UserTokenPayload;
  return payload;
};
