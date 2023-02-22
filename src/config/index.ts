import dotenv from "dotenv";
import path from "path";

import { env } from "utils/env";

dotenv.config({ path: path.join(process.cwd(), ".env.example") });

const PORT = env("PORT", 1000);
const MONGO_CONNECTION_URI = env("MONGO_CONNECTION_URI", "");
const JWT_SECRET = env("JWT_SECRET", "JWT_SECRET");
const HASH_SALT = Number(env("HASH_SALT", 10));
const SMTP_HOST = String(env("SMTP_HOST"));
const SMTP_PORT = Number(env("SMTP_PORT"));
const SMTP_USERNAME = String(env("SMTP_USERNAME"));
const SMTP_PASSWORD = String(env("SMTP_PASSWORD"));
const CLIENT_SERVER = String(env("CLIENT_SERVER"));

export const config = {
  PORT,
  MONGO_CONNECTION_URI,
  JWT_SECRET,
  HASH_SALT,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USERNAME,
  SMTP_PASSWORD,
  CLIENT_SERVER,
};
