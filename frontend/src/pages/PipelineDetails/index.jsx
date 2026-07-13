import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getPipeline,
} from "../../api/pipeline.api";

function PipelineDetails() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
    pipelineId,
  } = useParams();

  const [pipeline, setPipeline] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchPipeline() {
    try {
      setLoading(true);

      const response =
        await getPipeline(pipelineId);

      setPipeline(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to load pipeline."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPipeline();
  }, [pipelineId]);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Pipeline...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2 style={{ color: "red" }}>
          {error}
        </h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "950px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      <h1>
        ⚙ {pipeline.name}
      </h1>

      <p
        style={{
          color: "#6b7280",
        }}
      >
        {pipeline.description ||
          "No description available."}
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "30px",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/pipelines/${pipelineId}/edit`
            )
          }
        >
          ✏ Edit Pipeline
        </button>

        <button
          style={successButton}
          onClick={() =>
            navigate(
              `/pipelines/${pipelineId}/executions`
            )
          }
        >
          ▶ Run Pipeline
        </button>

        <button
          style={secondaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/pipelines`
            )
          }
        >
          📋 Back to Pipelines
        </button>
      </div>

      <hr />

      <h3>🔗 Repository</h3>
      <p>{pipeline.repository}</p>

      <h3>🌿 Branch</h3>
      <p>{pipeline.branch}</p>

      <h3>⚙ Provider</h3>
      <p>{pipeline.provider}</p>

      <h3>🚀 Trigger</h3>
      <p>{pipeline.trigger}</p>

      <h3>📊 Status</h3>
      <p>{pipeline.status}</p>

      <h3>⭐ Default Pipeline</h3>
      <p>
        {pipeline.defaultPipeline
          ? "Yes"
          : "No"}
      </p>

      <h3>🟢 Active</h3>
      <p>
        {pipeline.isActive
          ? "Yes"
          : "No"}
      </p>

      <h3>🕒 Last Run</h3>
      <p>
        {pipeline.lastRun
          ? new Date(
            pipeline.lastRun
          ).toLocaleString()
          : "Never"}
      </p>

      <h3>📅 Created</h3>
      <p>
        {new Date(
          pipeline.createdAt
        ).toLocaleString()}
      </p>

      <h3>🕒 Updated</h3>
      <p>
        {new Date(
          pipeline.updatedAt
        ).toLocaleString()}
      </p>
    </div>
  );
}

const primaryButton = {
  padding: "12px 22px",
  backgroundColor: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const successButton = {
  padding: "12px 22px",
  backgroundColor: "#16a34a",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "12px 22px",
  backgroundColor: "#374151",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default PipelineDetails;