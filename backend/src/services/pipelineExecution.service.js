import {
  createExecution,
  getExecutions,
  getExecutionById,
  getExecutionsByPipeline,
  updateExecution,
  deleteExecution,
} from "../repositories/pipelineExecution.repository.js";

import Pipeline from "../models/pipeline.model.js";
import { startPipelineExecution } from "../execution-engine/pipelineEngine.js";

/**
 * ===========================================
 * Default Pipeline Stages
 * ===========================================
 */

function createDefaultStages() {
  return [
    {
      name: "Checkout Source",
      status: "PENDING",
    },
    {
      name: "Install Dependencies",
      status: "PENDING",
    },
    {
      name: "Run Unit Tests",
      status: "PENDING",
    },
    {
      name: "SonarQube Scan",
      status: "PENDING",
    },
    {
      name: "Trivy Scan",
      status: "PENDING",
    },
    {
      name: "Build Docker Image",
      status: "PENDING",
    },
    {
      name: "Push Docker Image",
      status: "PENDING",
    },
    {
      name: "Deploy Kubernetes",
      status: "PENDING",
    },
  ];
}

/**
 * ===========================================
 * Execute Pipeline
 * ===========================================
 */

export async function executePipelineService(
  pipelineId,
  userId
) {
  const pipeline =
    await Pipeline.findById(
      pipelineId
    );

  if (!pipeline) {
    throw new Error(
      "Pipeline not found."
    );
  }

  const execution =
    await createExecution({
      pipeline: pipelineId,

      triggeredBy: userId,

      status: "QUEUED",

      startedAt: new Date(),

      duration: 0,

      stages:
        createDefaultStages(),

      logs: [],
    });

  // ===========================================
  // Start Pipeline Engine (Background)
  // ===========================================

  startPipelineExecution(
    execution._id
  ).catch((error) => {
    console.error(
      "Pipeline Engine Error:",
      error
    );
  });

  return execution;
}

/**
 * ===========================================
 * Get All Executions
 * ===========================================
 */

export async function getExecutionsService() {
  return await getExecutions();
}

/**
 * ===========================================
 * Get Execution By ID
 * ===========================================
 */

export async function getExecutionByIdService(
  executionId
) {
  const execution =
    await getExecutionById(
      executionId
    );

  if (!execution) {
    throw new Error(
      "Execution not found."
    );
  }

  return execution;
}

/**
 * ===========================================
 * Get Executions By Pipeline
 * ===========================================
 */

export async function getExecutionsByPipelineService(
  pipelineId
) {
  return await getExecutionsByPipeline(
    pipelineId
  );
}

/**
 * ===========================================
 * Update Execution
 * ===========================================
 */

export async function updateExecutionService(
  executionId,
  data
) {
  const execution =
    await updateExecution(
      executionId,
      data
    );

  if (!execution) {
    throw new Error(
      "Execution not found."
    );
  }

  return execution;
}

/**
 * ===========================================
 * Delete Execution
 * ===========================================
 */

export async function deleteExecutionService(
  executionId
) {
  const execution =
    await deleteExecution(
      executionId
    );

  if (!execution) {
    throw new Error(
      "Execution not found."
    );
  }

  return execution;
}