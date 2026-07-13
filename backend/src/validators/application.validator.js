import { body } from "express-validator";

export const createApplicationValidation = [
  // ============================
  // Application Name
  // ============================

  body("name")
    .trim()
    .notEmpty()
    .withMessage("Application name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage(
      "Application name must be between 3 and 100 characters."
    ),

  // ============================
  // Description
  // ============================

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage(
      "Description cannot exceed 500 characters."
    ),

  // ============================
  // Project
  // ============================

  body("project")
    .notEmpty()
    .withMessage("Project ID is required."),

  // ============================
  // Repository
  // ============================

  body("repository")
    .optional()
    .trim()
    .isURL()
    .withMessage(
      "Repository must be a valid URL."
    ),

  // ============================
  // Branch
  // ============================

  body("branch")
    .optional()
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage(
      "Branch name must be between 1 and 100 characters."
    ),

  // ============================
  // Runtime
  // ============================

  body("runtime")
    .isIn([
      "NODEJS",
      "JAVA",
      "PYTHON",
      "GO",
      "DOTNET",
    ])
    .withMessage("Invalid runtime."),

  // ============================
  // Framework
  // ============================

  body("framework")
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage(
      "Framework name cannot exceed 100 characters."
    ),

  // ============================
  // Docker Image
  // ============================

  body("dockerImage")
    .optional()
    .trim()
    .isLength({ max: 255 })
    .withMessage(
      "Docker image name cannot exceed 255 characters."
    ),
];