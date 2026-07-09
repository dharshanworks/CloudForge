import { validationResult } from "express-validator";
import { errorResponse } from "../utils/apiResponse.js";

export function validate(request, response, next) {
  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    return response.status(400).json(
      errorResponse(
        "Validation failed",
        errors.array()
      )
    );
  }

  next();
}