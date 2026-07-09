import { Routes, Route } from "react-router-dom";

import ROUTES from "./routeConstants";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Projects from "../pages/Projects";
import Applications from "../pages/Applications";
import NotFound from "../pages/NotFound";

import DashboardLayout from "../layouts/DashboardLayout";

function AppRouter() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path={ROUTES.LANDING} element={<Landing />} />
      <Route path={ROUTES.LOGIN} element={<Login />} />

      {/* Protected Layout Routes */}
      <Route element={<DashboardLayout />}>
        <Route
          path={ROUTES.DASHBOARD}
          element={<Dashboard />}
        />

        <Route
          path={ROUTES.PROJECTS}
          element={<Projects />}
        />

        <Route
          path={ROUTES.APPLICATIONS}
          element={<Applications />}
        />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRouter;