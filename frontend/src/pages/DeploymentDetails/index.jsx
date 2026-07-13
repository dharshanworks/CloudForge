import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getDeployment,
} from "../../api/deployment.api";

function DeploymentDetails() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
    deploymentId,
  } = useParams();

  const [deployment, setDeployment] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  async function fetchDeployment() {
    try {
      setLoading(true);

      const response =
        await getDeployment(
          deploymentId
        );

      setDeployment(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load deployment."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeployment();
  }, [deploymentId]);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>
          Loading Deployment...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2
          style={{
            color: "red",
          }}
        >
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

      <h1>
        🚀 Deployment
      </h1>

      <p
        style={{
          color: "#6b7280",
        }}
      >
        Complete deployment
        information.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginTop: "25px",
          marginBottom: "35px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/deployments/${deploymentId}/edit`
            )
          }
        >
          ✏ Edit Deployment
        </button>

        <button
          style={secondaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/deployments`
            )
          }
        >
          📋 Back to Deployments
        </button>
      </div>

      <hr />

      <h3>🏷 Version</h3>
      <p>{deployment.version}</p>

      <h3>🌍 Environment</h3>
      <p>{deployment.environment}</p>

      <h3>📊 Status</h3>
      <p>{deployment.status}</p>

      <h3>🐳 Docker Image</h3>
      <p>
        {deployment.dockerImage}
      </p>

      <h3>📅 Created</h3>
      <p>
        {new Date(
          deployment.createdAt
        ).toLocaleString()}
      </p>

      <h3>🕒 Updated</h3>
      <p>
        {new Date(
          deployment.updatedAt
        ).toLocaleString()}
      </p>
    </div>
  );
}

const primaryButton = {
  padding: "12px 24px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButton = {
  padding: "12px 24px",
  backgroundColor: "#374151",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default DeploymentDetails;