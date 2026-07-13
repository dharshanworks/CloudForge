import { body } from "express-validator";

export const createProjectValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("Project name is required.")
    .isLength({ min: 3, max: 100 })
    .withMessage("Project name must be between 3 and 100 characters."),

  body("description")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Description cannot exceed 500 characters."),

  body("gitRepository")
    .optional()
    .trim()
    .isURL()
    .withMessage("Git repository must be a valid URL."),

  body("cloudProvider")
    .isIn(["AWS", "AZURE", "GCP"])
    .withMessage("Invalid cloud provider."),

  body("environment")
    .isIn(["DEVELOPMENT", "STAGING", "PRODUCTION"])
    .withMessage("Invalid environment."),

  body("visibility")
    .optional()
    .isIn(["PRIVATE", "PUBLIC"])
    .withMessage("Invalid visibility.")
];