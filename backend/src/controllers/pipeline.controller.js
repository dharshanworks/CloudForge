import {
  createPipelineService,
  getPipelinesService,
  getPipelineByIdService,
  getPipelinesByApplicationService,
  updatePipelineService,
  deletePipelineService,
} from "../services/pipeline.service.js";

/**
 * ===========================================
 * Create Pipeline
 * ===========================================
 */

export async function createPipeline(req, res) {
  try {
    // Support both JWT payload formats
    const userId = req.user?._id || req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Authenticated user not found.",
      });
    }

    const pipeline =
      await createPipelineService({
        ...req.body,
        createdBy: userId,
      });

    return res.status(201).json({
      success: true,
      message:
        "Pipeline created successfully.",
      data: pipeline,
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
 * Get All Pipelines
 * ===========================================
 */

export async function getAllPipelines(req, res) {
  try {
    const pipelines =
      await getPipelinesService();

    return res.json({
      success: true,
      data: pipelines,
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
 * Get Pipeline By ID
 * ===========================================
 */

export async function getPipeline(req, res) {
  try {
    const pipeline =
      await getPipelineByIdService(
        req.params.pipelineId
      );

    return res.json({
      success: true,
      data: pipeline,
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
 * Get Pipelines By Application
 * ===========================================
 */

export async function getApplicationPipelines(
  req,
  res
) {
  try {
    const pipelines =
      await getPipelinesByApplicationService(
        req.params.applicationId
      );

    return res.json({
      success: true,
      data: pipelines,
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
 * Update Pipeline
 * ===========================================
 */

export async function updatePipeline(
  req,
  res
) {
  try {
    const pipeline =
      await updatePipelineService(
        req.params.pipelineId,
        req.body
      );

    return res.json({
      success: true,
      message:
        "Pipeline updated successfully.",
      data: pipeline,
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
 * Delete Pipeline
 * ===========================================
 */

export async function deletePipeline(
  req,
  res
) {
  try {
    await deletePipelineService(
      req.params.pipelineId
    );

    return res.json({
      success: true,
      message:
        "Pipeline deleted successfully.",
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
}