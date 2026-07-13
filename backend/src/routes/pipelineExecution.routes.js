import express from "express";

import {
  executePipeline,
  getExecutions,
  getExecution,
  getPipelineExecutions,
  updateExecution,
  deleteExecution,
} from "../controllers/pipelineExecution.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * ===========================================
 * Execute Pipeline
 * ===========================================
 */

router.post(
  "/pipelines/:pipelineId/run",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  executePipeline
);

/**
 * ===========================================
 * Get All Executions
 * ===========================================
 */

router.get(
  "/pipeline-executions",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getExecutions
);

/**
 * ===========================================
 * Get Executions By Pipeline
 * ===========================================
 */

router.get(
  "/pipelines/:pipelineId/executions",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getPipelineExecutions
);

/**
 * ===========================================
 * Get Execution By ID
 * ===========================================
 */

router.get(
  "/pipeline-executions/:executionId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getExecution
);

/**
 * ===========================================
 * Update Execution
 * ===========================================
 */

router.put(
  "/pipeline-executions/:executionId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  updateExecution
);

/**
 * ===========================================
 * Delete Execution
 * ===========================================
 */

router.delete(
  "/pipeline-executions/:executionId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  deleteExecution
);

export default router;