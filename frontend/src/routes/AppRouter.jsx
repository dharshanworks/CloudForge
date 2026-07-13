import { Routes, Route } from "react-router-dom";

import ROUTES from "./routeConstants";

// Public Pages
import Landing from "../pages/Landing";
import Login from "../pages/Login";

// Dashboard
import Dashboard from "../pages/Dashboard";

// Projects
import Projects from "../pages/Projects";
import CreateProject from "../pages/CreateProject";
import ProjectDetails from "../pages/ProjectDetails";
import EditProject from "../pages/EditProject";

// Applications
import Applications from "../pages/Applications";
import CreateApplication from "../pages/CreateApplication";
import ApplicationDetails from "../pages/ApplicationDetails";
import EditApplication from "../pages/EditApplication";

// Pipelines
import Pipelines from "../pages/Pipelines";
import CreatePipeline from "../pages/CreatePipeline";
import PipelineDetails from "../pages/PipelineDetails";
import EditPipeline from "../pages/EditPipeline";

// Deployments
import Deployments from "../pages/Deployments";
import CreateDeployment from "../pages/CreateDeployment";
import DeploymentDetails from "../pages/DeploymentDetails";
import EditDeployment from "../pages/EditDeployment";

// Executions
import Executions from "../pages/Executions";
import ExecutionDetails from "../pages/ExecutionDetails";

// Layout
import DashboardLayout from "../layouts/DashboardLayout";
import PrivateRoute from "../components/auth/PrivateRoute";

// 404
import NotFound from "../pages/NotFound";

function AppRouter() {
  return (
    <Routes>
      {/* ======================================
          Public Routes
      ====================================== */}

      <Route
        path={ROUTES.LANDING}
        element={<Landing />}
      />

      <Route
        path={ROUTES.LOGIN}
        element={<Login />}
      />

      {/* ======================================
          Protected Routes
      ====================================== */}

      <Route
        element={
          <PrivateRoute>
            <DashboardLayout />
          </PrivateRoute>
        }
      >
        {/* Dashboard */}

        <Route
          path={ROUTES.DASHBOARD}
          element={<Dashboard />}
        />

        {/* ======================================
            Project Routes
        ====================================== */}

        <Route
          path={ROUTES.PROJECTS}
          element={<Projects />}
        />

        <Route
          path={ROUTES.CREATE_PROJECT}
          element={<CreateProject />}
        />

        <Route
          path={ROUTES.PROJECT_DETAILS}
          element={<ProjectDetails />}
        />

        <Route
          path={ROUTES.EDIT_PROJECT}
          element={<EditProject />}
        />

        {/* ======================================
            Application Routes
        ====================================== */}

        <Route
          path={ROUTES.PROJECT_APPLICATIONS}
          element={<Applications />}
        />

        <Route
          path={ROUTES.CREATE_APPLICATION}
          element={<CreateApplication />}
        />

        <Route
          path={ROUTES.APPLICATION_DETAILS}
          element={<ApplicationDetails />}
        />

        <Route
          path={ROUTES.EDIT_APPLICATION}
          element={<EditApplication />}
        />

        {/* ======================================
            Pipeline Routes
        ====================================== */}

        <Route
          path={ROUTES.PIPELINES}
          element={<Pipelines />}
        />

        <Route
          path={ROUTES.CREATE_PIPELINE}
          element={<CreatePipeline />}
        />

        <Route
          path={ROUTES.PIPELINE_DETAILS}
          element={<PipelineDetails />}
        />

        <Route
          path={ROUTES.EDIT_PIPELINE}
          element={<EditPipeline />}
        />

        {/* ======================================
            Deployment Routes
        ====================================== */}

        <Route
          path={ROUTES.DEPLOYMENTS}
          element={<Deployments />}
        />

        <Route
          path={ROUTES.CREATE_DEPLOYMENT}
          element={<CreateDeployment />}
        />

        <Route
          path={ROUTES.DEPLOYMENT_DETAILS}
          element={<DeploymentDetails />}
        />

        <Route
          path={ROUTES.EDIT_DEPLOYMENT}
          element={<EditDeployment />}
        />

        {/* ======================================
            Execution Routes
        ====================================== */}

        <Route
          path={ROUTES.PIPELINE_EXECUTIONS}
          element={<Executions />}
        />

        <Route
          path={ROUTES.EXECUTION_DETAILS}
          element={<ExecutionDetails />}
        />
      </Route>

      {/* ======================================
          404
      ====================================== */}

      <Route
        path="*"
        element={<NotFound />}
      />
    </Routes>
  );
}

export default AppRouter;