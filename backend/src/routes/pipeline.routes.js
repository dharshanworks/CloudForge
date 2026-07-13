import express from "express";

import {
  createPipeline,
  getAllPipelines,
  getPipeline,
  getApplicationPipelines,
  updatePipeline,
  deletePipeline,
} from "../controllers/pipeline.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

/**
 * ===========================================
 * Create Pipeline
 * ===========================================
 */

router.post(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  createPipeline
);

/**
 * ===========================================
 * Get All Pipelines
 * ===========================================
 */

router.get(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getAllPipelines
);

/**
 * ===========================================
 * Get Pipelines By Application
 * ===========================================
 */

router.get(
  "/application/:applicationId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getApplicationPipelines
);

/**
 * ===========================================
 * Get Pipeline By ID
 * ===========================================
 */

router.get(
  "/:pipelineId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getPipeline
);

/**
 * ===========================================
 * Update Pipeline
 * ===========================================
 */

router.put(
  "/:pipelineId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  updatePipeline
);

/**
 * ===========================================
 * Delete Pipeline
 * ===========================================
 */

router.delete(
  "/:pipelineId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  deletePipeline
);

export default router;