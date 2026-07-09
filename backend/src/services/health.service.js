export function getHealthStatus() {
  return {
    environment: process.env.NODE_ENV,
    uptime: process.uptime(),
    version: "1.0.0"
  };
}