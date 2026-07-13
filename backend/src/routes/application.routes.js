import express from "express";

import {
  createApplication,
  getProjectApplications,
  getApplicationById,
  updateApplicationController,
  deleteApplicationController,
} from "../controllers/application.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";

import {
  createApplicationValidation,
} from "../validators/application.validator.js";

const router = express.Router();

/**
 * Create Application
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  createApplicationValidation,
  validate,
  createApplication
);

/**
 * Get Applications By Project
 */
router.get(
  "/project/:projectId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getProjectApplications
);

/**
 * Get Application
 */
router.get(
  "/:applicationId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getApplicationById
);

/**
 * Update Application
 */
router.put(
  "/:applicationId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  updateApplicationController
);

/**
 * Delete Application
 */
router.delete(
  "/:applicationId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  deleteApplicationController
);

export default router;