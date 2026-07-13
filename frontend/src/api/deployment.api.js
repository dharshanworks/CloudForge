import api from "./axios";

/**
 * ===========================================
 * Create Deployment
 * ===========================================
 */
export async function createDeployment(
  data
) {
  const response = await api.post(
    "/deployments",
    data
  );

  return response.data;
}

/**
 * ===========================================
 * Get Deployments
 * ===========================================
 */
export async function getDeployments(
  applicationId
) {
  const response = await api.get(
    `/deployments/application/${applicationId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Get Deployment
 * ===========================================
 */
export async function getDeployment(
  deploymentId
) {
  const response = await api.get(
    `/deployments/${deploymentId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Update Deployment
 * ===========================================
 */
export async function updateDeployment(
  deploymentId,
  data
) {
  const response = await api.put(
    `/deployments/${deploymentId}`,
    data
  );

  return response.data;
}

/**
 * ===========================================
 * Delete Deployment
 * ===========================================
 */
export async function deleteDeployment(
  deploymentId
) {
  const response = await api.delete(
    `/deployments/${deploymentId}`
  );

  return response.data;
}