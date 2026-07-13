import express from "express";

import {
  createDeployment,
  getApplicationDeployments,
  getDeploymentById,
  updateDeploymentController,
  deleteDeploymentController,
} from "../controllers/deployment.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
  createDeploymentValidation,
} from "../validators/deployment.validator.js";

const router = express.Router();

/**
 * ===========================================
 * Create Deployment
 * ===========================================
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  createDeploymentValidation,
  validate,
  createDeployment
);

/**
 * ===========================================
 * Get Deployments By Application
 * ===========================================
 */
router.get(
  "/application/:applicationId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getApplicationDeployments
);

/**
 * ===========================================
 * Get Deployment By ID
 * ===========================================
 */
router.get(
  "/:deploymentId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getDeploymentById
);

/**
 * ===========================================
 * Update Deployment
 * ===========================================
 */
router.put(
  "/:deploymentId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  updateDeploymentController
);

/**
 * ===========================================
 * Delete Deployment
 * ===========================================
 */
router.delete(
  "/:deploymentId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  deleteDeploymentController
);

export default router;