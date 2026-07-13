import mongoose from "mongoose";

/**
 * ===========================================
 * Execution Log Schema
 * ===========================================
 */

const executionLogSchema =
  new mongoose.Schema(
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },

      level: {
        type: String,
        enum: [
          "INFO",
          "SUCCESS",
          "WARNING",
          "ERROR",
        ],
        default: "INFO",
      },

      message: {
        type: String,
        required: true,
      },
    },
    {
      _id: false,
    }
  );

/**
 * ===========================================
 * Pipeline Stage Schema
 * ===========================================
 */

const stageSchema =
  new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "PENDING",
          "RUNNING",
          "SUCCESS",
          "FAILED",
          "SKIPPED",
        ],
        default: "PENDING",
      },

      startedAt: {
        type: Date,
        default: null,
      },

      finishedAt: {
        type: Date,
        default: null,
      },

      duration: {
        type: Number,
        default: 0,
      },

      logs: {
        type: [String],
        default: [],
      },
    },
    {
      _id: false,
    }
  );

/**
 * ===========================================
 * Pipeline Execution Schema
 * ===========================================
 */

const pipelineExecutionSchema =
  new mongoose.Schema(
    {
      pipeline: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Pipeline",
        required: true,
        index: true,
      },

      triggeredBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      status: {
        type: String,
        enum: [
          "QUEUED",
          "RUNNING",
          "SUCCESS",
          "FAILED",
          "CANCELLED",
        ],
        default: "QUEUED",
      },

      startedAt: {
        type: Date,
        default: Date.now,
      },

      finishedAt: {
        type: Date,
        default: null,
      },

      duration: {
        type: Number,
        default: 0,
      },

      stages: {
        type: [stageSchema],
        default: [],
      },

      logs: {
        type: [executionLogSchema],
        default: [],
      },
    },
    {
      timestamps: true,
    }
  );

const PipelineExecution =
  mongoose.model(
    "PipelineExecution",
    pipelineExecutionSchema
  );

export default PipelineExecution;