import {
  executePipelineService,
  getExecutionsService,
  getExecutionByIdService,
  getExecutionsByPipelineService,
  updateExecutionService,
  deleteExecutionService,
} from "../services/pipelineExecution.service.js";

/**
 * ===========================================
 * Execute Pipeline
 * ===========================================
 */
export async function executePipeline(req, res) {
  try {
    // Support both _id and id from JWT payload
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user not found.",
      });
    }

    const execution = await executePipelineService(
      req.params.pipelineId,
      userId
    );

    return res.status(201).json({
      success: true,
      message: "Pipeline execution started successfully.",
      data: execution,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * ===========================================
 * Get All Executions
 * ===========================================
 */
export async function getExecutions(req, res) {
  try {
    const executions = await getExecutionsService();

    return res.status(200).json({
      success: true,
      data: executions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * ===========================================
 * Get Execution By ID
 * ===========================================
 */
export async function getExecution(req, res) {
  try {
    const execution = await getExecutionByIdService(
      req.params.executionId
    );

    return res.status(200).json({
      success: true,
      data: execution,
    });
  } catch (error) {
    return res.status(404).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * ===========================================
 * Get Executions By Pipeline
 * ===========================================
 */
export async function getPipelineExecutions(req, res) {
  try {
    const executions =
      await getExecutionsByPipelineService(
        req.params.pipelineId
      );

    return res.status(200).json({
      success: true,
      data: executions,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * ===========================================
 * Update Execution
 * ===========================================
 */
export async function updateExecution(req, res) {
  try {
    const execution =
      await updateExecutionService(
        req.params.executionId,
        req.body
      );

    return res.status(200).json({
      success: true,
      message: "Execution updated successfully.",
      data: execution,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/**
 * ===========================================
 * Delete Execution
 * ===========================================
 */
export async function deleteExecution(req, res) {
  try {
    await deleteExecutionService(
      req.params.executionId
    );

    return res.status(200).json({
      success: true,
      message: "Execution deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}