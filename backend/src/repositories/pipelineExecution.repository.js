import PipelineExecution from "../models/pipelineExecution.model.js";

/**
 * ===========================================
 * Create Execution
 * ===========================================
 */

export async function createExecution(data) {
  return await PipelineExecution.create(data);
}

/**
 * ===========================================
 * Get All Executions
 * ===========================================
 */

export async function getExecutions() {
  return await PipelineExecution.find()
    .populate("pipeline", "name")
    .populate("triggeredBy", "name email")
    .sort({
      createdAt: -1,
    });
}

/**
 * ===========================================
 * Get Execution By ID
 * ===========================================
 */

export async function getExecutionById(
  executionId
) {
  return await PipelineExecution.findById(
    executionId
  )
    .populate("pipeline")
    .populate("triggeredBy", "name email");
}

/**
 * ===========================================
 * Get Executions By Pipeline
 * ===========================================
 */

export async function getExecutionsByPipeline(
  pipelineId
) {
  return await PipelineExecution.find({
    pipeline: pipelineId,
  }).sort({
    createdAt: -1,
  });
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
  return await PipelineExecution.findByIdAndUpdate(
    executionId,
    data,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * ===========================================
 * Delete Execution
 * ===========================================
 */

export async function deleteExecution(
  executionId
) {
  return await PipelineExecution.findByIdAndDelete(
    executionId
  );
}