function getHealthStatus() {
  return {
    success: true,
    message: "CloudForge Backend is running successfully",
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString(),
  };
}

export { getHealthStatus };