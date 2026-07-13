import express from "express";

import {
  createProject,
  getProjects,
  getProjectById,
  updateProjectController,
  archiveProjectController,
} from "../controllers/project.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";
import { validate } from "../middlewares/validation.middleware.js";
import { createProjectValidation } from "../validators/project.validator.js";

const router = express.Router();

/**
 * Create Project
 */
router.post(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  createProjectValidation,
  validate,
  createProject
);

/**
 * Get My Projects
 */
router.get(
  "/",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getProjects
);

/**
 * Get Project By ID
 */
router.get(
  "/:projectId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getProjectById
);

/**
 * Update Project
 */
router.put(
  "/:projectId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  updateProjectController
);

/**
 * Archive Project
 */
router.delete(
  "/:projectId",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  archiveProjectController
);

export default router;