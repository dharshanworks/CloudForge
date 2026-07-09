import { getHealthStatus } from "./health.service.js";

function healthCheck(req, res) {
  const health = getHealthStatus();

  res.status(200).json(health);
}

export { healthCheck };