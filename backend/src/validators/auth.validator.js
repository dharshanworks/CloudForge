import { body } from "express-validator";

export const registerValidation = [
  body("fullName")
    .trim()
    .notEmpty()
    .withMessage("Full name is required."),

  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required."),

  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters.")
];

export const loginValidation = [
  body("email")
    .trim()
    .isEmail()
    .withMessage("Valid email is required."),

  body("password")
    .notEmpty()
    .withMessage("Password is required.")
];