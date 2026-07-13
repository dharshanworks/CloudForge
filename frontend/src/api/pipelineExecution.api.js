import api from "./axios";

/**
 * ===========================================
 * Run Pipeline
 * ===========================================
 */

export async function runPipeline(
  pipelineId
) {
  const response = await api.post(
    `/pipelines/${pipelineId}/run`
  );

  return response.data;
}

/**
 * ===========================================
 * Get All Executions
 * ===========================================
 */

export async function getExecutions() {
  const response = await api.get(
    "/pipeline-executions"
  );

  return response.data;
}

/**
 * ===========================================
 * Get Executions By Pipeline
 * ===========================================
 */

export async function getPipelineExecutions(
  pipelineId
) {
  const response = await api.get(
    `/pipelines/${pipelineId}/executions`
  );

  return response.data;
}

/**
 * ===========================================
 * Get Execution
 * ===========================================
 */

export async function getExecution(
  executionId
) {
  const response = await api.get(
    `/pipeline-executions/${executionId}`
  );

  return response.data;
}

/**
 * ===========================================
 * Update Execution
 * ===========================================
 */

export async function updateExecution(
  executionId,
  data
) {
  const response = await api.put(
    `/pipeline-executions/${executionId}`,
    data
  );

  return response.data;
}

/**
 * ===========================================
 * Delete Execution
 * ===========================================
 */

export async function deleteExecution(
  executionId
) {
  const response = await api.delete(
    `/pipeline-executions/${executionId}`
  );

  return response.data;
}