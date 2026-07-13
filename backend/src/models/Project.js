import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
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

    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    gitRepository: {
      type: String,
      default: "",
      trim: true,
    },

    cloudProvider: {
      type: String,
      enum: ["AWS", "AZURE", "GCP"],
      default: "AWS",
    },

    environment: {
      type: String,
      enum: ["DEVELOPMENT", "STAGING", "PRODUCTION"],
      default: "DEVELOPMENT",
    },

    visibility: {
      type: String,
      enum: ["PRIVATE", "PUBLIC"],
      default: "PRIVATE",
    },

    status: {
      type: String,
      enum: ["ACTIVE", "ARCHIVED"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Project = mongoose.model("Project", projectSchema);

export default Project;