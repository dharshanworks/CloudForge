import mongoose from "mongoose";

const applicationSchema = new mongoose.Schema(
  {
    // ============================
    // Basic Information
    // ============================

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================
    // Relationship
    // ============================

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ============================
    // Source Code
    // ============================

    repository: {
      type: String,
      default: "",
      trim: true,
    },

    branch: {
      type: String,
      default: "main",
      trim: true,
    },

    // ============================
    // Technology Stack
    // ============================

    runtime: {
      type: String,
      enum: [
        "NODEJS",
        "JAVA",
        "PYTHON",
        "GO",
        "DOTNET",
      ],
      default: "NODEJS",
    },

    framework: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================
    // Container
    // ============================

    dockerImage: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================
    // Deployment
    // ============================

    status: {
      type: String,
      enum: [
        "CREATED",
        "BUILDING",
        "DEPLOYING",
        "RUNNING",
        "FAILED",
        "STOPPED",
      ],
      default: "CREATED",
    },
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model(
  "Application",
  applicationSchema
);

export default Application;