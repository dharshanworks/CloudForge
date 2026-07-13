import mongoose from "mongoose";

const deploymentSchema = new mongoose.Schema(
  {
    // ============================
    // Relationships
    // ============================

    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
    },

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // ============================
    // Deployment Information
    // ============================

    version: {
      type: String,
      required: true,
      default: "v1.0.0",
      trim: true,
    },

    environment: {
      type: String,
      enum: [
        "DEVELOPMENT",
        "STAGING",
        "PRODUCTION",
      ],
      default: "DEVELOPMENT",
    },

    dockerImage: {
      type: String,
      default: "",
      trim: true,
    },

    // ============================
    // Deployment Status
    // ============================

    status: {
      type: String,
      enum: [
        "PENDING",
        "BUILDING",
        "DEPLOYING",
        "RUNNING",
        "FAILED",
        "ROLLED_BACK",
      ],
      default: "PENDING",
    },

    // ============================
    // Metadata
    // ============================

    deployedAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const Deployment = mongoose.model(
  "Deployment",
  deploymentSchema
);

export default Deployment;