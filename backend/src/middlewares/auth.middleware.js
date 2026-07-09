import jwt from "jsonwebtoken";
import appConfig from "../config/app.config.js";
import { errorResponse } from "../utils/apiResponse.js";

export function authenticate(request, response, next) {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    return response.status(401).json(
      errorResponse("Authorization token is required.")
    );
  }

  const token = authorizationHeader.replace("Bearer ", "");

  try {
    const decoded = jwt.verify(
      token,
      appConfig.jwt.secret
    );

    request.user = decoded;

    next();
  } catch (error) {
    return response.status(401).json(
      errorResponse("Invalid or expired token.")
    );
  }
}