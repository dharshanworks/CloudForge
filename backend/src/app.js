import express from "express";
import cors from "cors";

import healthRoutes from "./health/health.routes.js";
import userRoutes from "./routes/user.routes.js";
import authRoutes from "./routes/auth.routes.js";


const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1/health", healthRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/auth", authRoutes);

export default app;