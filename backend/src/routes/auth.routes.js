import express from "express";

import {
  login,
  me,
} from "../controllers/auth.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

import {
  loginValidation,
} from "../validators/auth.validator.js";

import { validate } from "../middlewares/validation.middleware.js";

const router = express.Router();

router.post(
  "/login",
  loginValidation,
  validate,
  login
);

router.get(
  "/me",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  me
);

export default router;