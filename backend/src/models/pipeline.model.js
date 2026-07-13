import mongoose from "mongoose";

const pipelineSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },

    description: {
      type: String,
      default: "",
      maxlength: 500,
    },

    application: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Application",
      required: true,
      index: true,
    },

    repository: {
      type: String,
      required: true,
      trim: true,
    },

    branch: {
      type: String,
      required: true,
      default: "main",
    },

    provider: {
      type: String,
      enum: [
        "GITHUB_ACTIONS",
        "JENKINS",
        "GITLAB_CI",
        "AZURE_DEVOPS",
        "CIRCLE_CI",
      ],
      default: "GITHUB_ACTIONS",
    },

    trigger: {
      type: String,
      enum: [
        "MANUAL",
        "PUSH",
        "PULL_REQUEST",
        "SCHEDULE",
      ],
      default: "PUSH",
    },

    status: {
      type: String,
      enum: [
        "IDLE",
        "RUNNING",
        "SUCCESS",
        "FAILED",
        "CANCELLED",
      ],
      default: "IDLE",
    },

    defaultPipeline: {
      type: Boolean,
      default: false,
    },

    isActive: {
      type: Boolean,
      default: true,
    },

    lastRun: {
      type: Date,
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

pipelineSchema.index({
  application: 1,
  name: 1,
});

const Pipeline = mongoose.model(
  "Pipeline",
  pipelineSchema
);

export default Pipeline;