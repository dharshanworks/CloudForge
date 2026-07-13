import { body } from "express-validator";

export const createDeploymentValidation = [
  // ============================
  // Application
  // ============================

  body("application")
    .notEmpty()
    .withMessage("Application ID is required."),

  // ============================
  // Version
  // ============================

  body("version")
    .optional()
    .trim()
    .isLength({
      min: 1,
      max: 30,
    })
    .withMessage(
      "Version must be between 1 and 30 characters."
    ),

  // ============================
  // Environment
  // ============================

  body("environment")
    .isIn([
      "DEVELOPMENT",
      "STAGING",
      "PRODUCTION",
    ])
    .withMessage(
      "Invalid deployment environment."
    ),

  // ============================
  // Docker Image
  // ============================

  body("dockerImage")
    .optional()
    .trim()
    .isLength({
      max: 255,
    })
    .withMessage(
      "Docker image cannot exceed 255 characters."
    ),
];