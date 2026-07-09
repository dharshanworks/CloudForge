import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";

export function generateAccessToken(payload) {
  return jwt.sign(
    payload,
    appConfig.jwt.secret,
    {
      expiresIn: appConfig.jwt.expiresIn,
    }
  );
}