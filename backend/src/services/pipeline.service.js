import {
  createPipeline,
  getPipelines,
  getPipelineById,
  getPipelinesByApplication,
  updatePipeline,
  deletePipeline,
} from "../repositories/pipeline.repository.js";

/**
 * ===========================================
 * Create Pipeline
 * ===========================================
 */

export async function createPipelineService(data) {
  return await createPipeline(data);
}

/**
 * ===========================================
 * Get All Pipelines
 * ===========================================
 */

export async function getPipelinesService() {
  return await getPipelines();
}

/**
 * ===========================================
 * Get Pipeline By ID
 * ===========================================
 */

export async function getPipelineByIdService(
  pipelineId
) {
  const pipeline =
    await getPipelineById(pipelineId);

  if (!pipeline) {
    throw new Error("Pipeline not found.");
  }

  return pipeline;
}

/**
 * ===========================================
 * Get Pipelines By Application
 * ===========================================
 */

export async function getPipelinesByApplicationService(
  applicationId
) {
  return await getPipelinesByApplication(
    applicationId
  );
}

/**
 * ===========================================
 * Update Pipeline
 * ===========================================
 */

export async function updatePipelineService(
  pipelineId,
  data
) {
  const pipeline =
    await updatePipeline(
      pipelineId,
      data
    );

  if (!pipeline) {
    throw new Error("Pipeline not found.");
  }

  return pipeline;
}

/**
 * ===========================================
 * Delete Pipeline
 * ===========================================
 */

export async function deletePipelineService(
  pipelineId
) {
  const pipeline =
    await deletePipeline(pipelineId);

  if (!pipeline) {
    throw new Error("Pipeline not found.");
  }

  return pipeline;
}