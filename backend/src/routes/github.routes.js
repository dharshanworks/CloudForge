import express from "express";

import {
  validateRepository,
  getRepositoryDetails,
  getRepositoryBranches,
  getLatestCommit,
  getCommitHistory,
} from "../controllers/github.controller.js";

import { authenticate } from "../middlewares/auth.middleware.js";
import { authorize } from "../middlewares/authorize.middleware.js";

const router = express.Router();

/*
===========================================
Validate Repository
POST /api/v1/github/validate
===========================================
*/

router.post(
  "/validate",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  validateRepository
);

/*
===========================================
Repository Details
GET /api/v1/github/repository
===========================================
*/

router.get(
  "/repository",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getRepositoryDetails
);

/*
===========================================
Branches
GET /api/v1/github/branches
===========================================
*/

router.get(
  "/branches",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getRepositoryBranches
);

/*
===========================================
Latest Commit
GET /api/v1/github/latest-commit
===========================================
*/

router.get(
  "/latest-commit",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getLatestCommit
);

/*
===========================================
Commit History
GET /api/v1/github/commits
===========================================
*/

router.get(
  "/commits",
  authenticate,
  authorize("ADMIN", "DEVELOPER"),
  getCommitHistory
);

export default router;