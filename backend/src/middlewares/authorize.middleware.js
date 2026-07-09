import { errorResponse } from "../utils/apiResponse.js";

export function authorize(...allowedRoles) {
  return (request, response, next) => {
    if (!request.user) {
      return response.status(401).json(
        errorResponse("Authentication required.")
      );
    }

    if (!allowedRoles.includes(request.user.role)) {
      return response.status(403).json(
        errorResponse("Access denied.")
      );
    }

    next();
  };
}