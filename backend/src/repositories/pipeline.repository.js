import Pipeline from "../models/pipeline.model.js";

/**
 * ===========================================
 * Create Pipeline
 * ===========================================
 */

export async function createPipeline(data) {
  return await Pipeline.create(data);
}

/**
 * ===========================================
 * Get All Pipelines
 * ===========================================
 */

export async function getPipelines() {
  return await Pipeline.find()
    .populate("application", "name")
    .populate("createdBy", "name email")
    .sort({ createdAt: -1 });
}

/**
 * ===========================================
 * Get Pipeline By ID
 * ===========================================
 */

export async function getPipelineById(
  pipelineId
) {
  return await Pipeline.findById(
    pipelineId
  )
    .populate("application", "name")
    .populate("createdBy", "name email");
}

/**
 * ===========================================
 * Get Pipelines By Application
 * ===========================================
 */

export async function getPipelinesByApplication(
  applicationId
) {
  return await Pipeline.find({
    application: applicationId,
  }).sort({
    createdAt: -1,
  });
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
  return await Pipeline.findByIdAndUpdate(
    pipelineId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * ===========================================
 * Delete Pipeline
 * ===========================================
 */

export async function deletePipeline(
  pipelineId
) {
  return await Pipeline.findByIdAndDelete(
    pipelineId
  );
}