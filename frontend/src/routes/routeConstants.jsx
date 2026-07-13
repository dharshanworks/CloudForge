const ROUTES = {
  // ============================
  // Public Routes
  // ============================

  LANDING: "/",
  LOGIN: "/login",

  // ============================
  // Dashboard
  // ============================

  DASHBOARD: "/dashboard",

  // ============================
  // Project Routes
  // ============================

  PROJECTS: "/projects",

  CREATE_PROJECT: "/projects/create",

  PROJECT_DETAILS: "/projects/:projectId",

  EDIT_PROJECT: "/projects/:projectId/edit",

  // ============================
  // Application Routes
  // ============================

  PROJECT_APPLICATIONS:
    "/projects/:projectId/applications",

  CREATE_APPLICATION:
    "/projects/:projectId/applications/create",

  APPLICATION_DETAILS:
    "/projects/:projectId/applications/:applicationId",

  EDIT_APPLICATION:
    "/projects/:projectId/applications/:applicationId/edit",

  // ============================
  // Pipeline Routes
  // ============================

  PIPELINES:
    "/projects/:projectId/applications/:applicationId/pipelines",

  CREATE_PIPELINE:
    "/projects/:projectId/applications/:applicationId/pipelines/create",

  PIPELINE_DETAILS:
    "/projects/:projectId/applications/:applicationId/pipelines/:pipelineId",

  EDIT_PIPELINE:
    "/projects/:projectId/applications/:applicationId/pipelines/:pipelineId/edit",

  // ============================
  // Deployment Routes
  // ============================

  DEPLOYMENTS:
    "/projects/:projectId/applications/:applicationId/deployments",

  CREATE_DEPLOYMENT:
    "/projects/:projectId/applications/:applicationId/deployments/create",

  DEPLOYMENT_DETAILS:
    "/projects/:projectId/applications/:applicationId/deployments/:deploymentId",

  EDIT_DEPLOYMENT:
    "/projects/:projectId/applications/:applicationId/deployments/:deploymentId/edit",

  // ============================
  // Execution Routes
  // ============================

  PIPELINE_EXECUTIONS:
    "/pipelines/:pipelineId/executions",

  EXECUTION_DETAILS:
    "/pipeline-executions/:executionId",
};

export default ROUTES;