import { getHealthStatus } from "../services/health.service.js";
import { successResponse } from "../utils/apiResponse.js";

export function healthCheck(request, response) {
  const healthStatus = getHealthStatus();

  return response.status(200).json(
    successResponse(
      "Health check completed successfully",
      healthStatus
    )
  );
}