import { config } from "config";
import { Schema } from "mongoose";

export const generatePasswordResetLink = (
  resetToken: string,
  userId: Schema.Types.ObjectId
) => {
  const link = `${config.CLIENT_SERVER}/passwordReset?token=${resetToken}&id=${userId}`;
  return link;
};

export const generateVerificationEmailLink = (token: string) => {
  const link = `${config.CLIENT_SERVER}/verification-email?token=${token}`;
  return link;
};
