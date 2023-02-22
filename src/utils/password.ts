import bcrypt from "bcrypt";
import crypto from "crypto";

import { config } from "config";

export const hashPassword = async (plaintextPassword: string) => {
  const hash = await bcrypt.hash(plaintextPassword, config.HASH_SALT);
  return hash;
};

export const comparePassword = async (
  plainTextPassword: string,
  hash: string
) => {
  const result = await bcrypt.compare(plainTextPassword, hash);
  return result;
};

export const generatePasswordResetToken = async () => {
  const randomString = crypto.randomBytes(32).toString("hex");
  console.log(randomString, "randomString");
  const hash = await bcrypt.hash(randomString, Number(config.HASH_SALT));
  console.log(hash, "hash");
  return hash;
};
