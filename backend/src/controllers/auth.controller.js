import {
  loginUser,
  getCurrentUser,
} from "../services/auth.service.js";
import { successResponse } from "../utils/apiResponse.js";

/**
 * Login Controller
 */
export async function login(request, response, next) {
  try {
    const { email, password } = request.body;

    const result = await loginUser(email, password);

    return response.status(200).json(
      successResponse(
        "Login successful",
        result
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Current Logged-in User Controller
 */
export async function me(request, response, next) {
  try {
    const user = await getCurrentUser(request.user.id);

    return response.status(200).json(
      successResponse(
        "Current user fetched successfully",
        user
      )
    );
  } catch (error) {
    next(error);
  }
}