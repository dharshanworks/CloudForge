import api from "./axios";

/**
 * ==========================================================
 * Pipeline API
 * ==========================================================
 * Handles all Pipeline-related API requests.
 * ==========================================================
 */

/**
 * ===========================================
 * Create Pipeline
 * ===========================================
 */
export async function createPipeline(data) {
  const response = await api.post(
    "/pipelines",
    data
  );

  return response.data;
}

/**
 * ===========================================
 * Get All Pipelines
 * ===========================================
 */
export async function getPipelines() {
  const response = await api.get(
    "/pipelines"
  );

  return response.data;
}

/**
 * ===========================================
 * Get Pipeline By ID
 * ===========================================
 */
export async function getPipeline(
  pipelineId
) {
  const response = await api.get(
    `/pipelines/${pipelineId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Get Pipelines By Application
 * ===========================================
 */
export async function getApplicationPipelines(
  applicationId
) {
  const response = await api.get(
    `/pipelines/application/${applicationId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Update Pipeline
 * ===========================================
 */
export async function updatePipeline(
  pipelineId,
  data
) {
  const response = await api.put(
    `/pipelines/${pipelineId}`,
    data
  );

  return response.data;
}

/**
 * ===========================================
 * Delete Pipeline
 * ===========================================
 */
export async function deletePipeline(
  pipelineId
) {
  const response = await api.delete(
    `/pipelines/${pipelineId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Export All
 * ===========================================
 */
export default {
  createPipeline,
  getPipelines,
  getPipeline,
  getApplicationPipelines,
  updatePipeline,
  deletePipeline,
};