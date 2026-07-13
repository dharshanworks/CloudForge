import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getApplication } from "../../api/application.api";

function ApplicationDetails() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
  } = useParams();

  const [application, setApplication] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchApplication() {
    try {
      setLoading(true);

      const response =
        await getApplication(applicationId);

      setApplication(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load application."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Application...</h2>
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
          "0 5px 20px rgba(0,0,0,0.08)",
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

      <h1>📦 {application.name}</h1>

      <p style={{ color: "#6b7280" }}>
        {application.description}
      </p>

      {/* ===============================
          ACTIONS
      =============================== */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginTop: "25px",
          marginBottom: "35px",
        }}
      >
        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/edit`
            )
          }
        >
          ✏ Edit Application
        </button>

        <button
          style={successButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/deployments/create`
            )
          }
        >
          🚀 Create Deployment
        </button>

        <button
          style={secondaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/deployments`
            )
          }
        >
          📋 View Deployments
        </button>

        <button
          style={pipelineButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/pipelines`
            )
          }
        >
          ⚙ View Pipelines
        </button>

        <button
          style={pipelineCreateButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/pipelines/create`
            )
          }
        >
          ➕ Create Pipeline
        </button>
      </div>

      <hr />

      <h3>🔗 Repository</h3>
      <p>{application.repository || "Not Configured"}</p>

      <h3>🌿 Branch</h3>
      <p>{application.branch}</p>

      <h3>⚙ Runtime</h3>
      <p>{application.runtime}</p>

      <h3>🧩 Framework</h3>
      <p>{application.framework || "-"}</p>

      <h3>🐳 Docker Image</h3>
      <p>{application.dockerImage || "-"}</p>

      <h3>📊 Status</h3>
      <p>{application.status}</p>

      <h3>📅 Created At</h3>
      <p>
        {new Date(
          application.createdAt
        ).toLocaleString()}
      </p>

      <h3>🕒 Last Updated</h3>
      <p>
        {new Date(
          application.updatedAt
        ).toLocaleString()}
      </p>
    </div>
  );
}

const primaryButton = {
  padding: "12px 22px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const successButton = {
  padding: "12px 22px",
  backgroundColor: "#16a34a",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButton = {
  padding: "12px 22px",
  backgroundColor: "#374151",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const pipelineButton = {
  padding: "12px 22px",
  backgroundColor: "#7c3aed",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const pipelineCreateButton = {
  padding: "12px 22px",
  backgroundColor: "#9333ea",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default ApplicationDetails;