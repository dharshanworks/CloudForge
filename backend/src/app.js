import express from "express";
import cors from "cors";
import dns from "node:dns";

import healthRoutes from "./health/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/project.routes.js";
import applicationRoutes from "./routes/application.routes.js";
import deploymentRoutes from "./routes/deployment.routes.js";
import pipelineRoutes from "./routes/pipeline.routes.js";
import pipelineExecutionRoutes from "./routes/pipelineExecution.routes.js";

/*
===========================================
Phase 36
GitHub Integration
===========================================
*/
import githubRoutes from "./routes/github.routes.js";

// Prefer IPv4
dns.setDefaultResultOrder("ipv4first");

// DNS Servers
dns.setServers([
  "1.1.1.1",
  "8.8.8.8",
]);

const app = express();

/*
===========================================
Middlewares
===========================================
*/

app.use(cors());

app.use(express.json());

/*
===========================================
API Routes
===========================================
*/

app.use(
  "/api/v1/health",
  healthRoutes
);

app.use(
  "/api/v1/users",
  userRoutes
);

app.use(
  "/api/v1/auth",
  authRoutes
);

app.use(
  "/api/v1/projects",
  projectRoutes
);

app.use(
  "/api/v1/applications",
  applicationRoutes
);

app.use(
  "/api/v1/deployments",
  deploymentRoutes
);

app.use(
  "/api/v1/pipelines",
  pipelineRoutes
);

/*
===========================================
Pipeline Executions
===========================================
*/

app.use(
  "/api/v1",
  pipelineExecutionRoutes
);

/*
===========================================
GitHub Integration
===========================================
*/

app.use(
  "/api/v1/github",
  githubRoutes
);

export default app;