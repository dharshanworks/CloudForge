import { errorResponse } from "../utils/apiResponse.js";

export function errorHandler(error, request, response, next) {
  const statusCode = error.statusCode || 500;

  return response
    .status(statusCode)
    .json(
      errorResponse(
        error.message || "Internal Server Error"
      )
    );
}