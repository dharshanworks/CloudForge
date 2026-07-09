import { registerUser } from "../services/user.service.js";
import { successResponse } from "../utils/apiResponse.js";

export async function register(request, response, next) {
  try {
    const user = await registerUser(request.body);

    return response.status(201).json(
      successResponse(
        "User registered successfully",
        user
      )
    );
  } catch (error) {
    next(error);
  }
}