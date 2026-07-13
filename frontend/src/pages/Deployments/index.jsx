import { useParams, useNavigate } from "react-router-dom";

import useDeployments from "../../hooks/useDeployments";

import DeploymentCard from "../../components/deployments/DeploymentCard";

function Deployments() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
  } = useParams();

  const {
    deployments,
    loading,
    error,
    fetchDeployments,
  } = useDeployments(applicationId);

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading deployments...</h2>
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
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>🚀 Deployments</h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Manage all deployments
            for this application.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/deployments/create`
            )
          }
          style={primaryButton}
        >
          + New Deployment
        </button>
      </div>

      {/* Empty State */}

      {deployments.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            padding: "60px",
            borderRadius: "12px",
            textAlign: "center",
            border:
              "1px solid #e5e7eb",
          }}
        >
          <h2>
            No deployments found
          </h2>

          <p>
            Create your first
            deployment.
          </p>
        </div>
      )}

      {/* Deployment List */}

      {deployments.map(
        (deployment) => (
          <DeploymentCard
            key={deployment._id}
            deployment={deployment}
            onDelete={
              fetchDeployments
            }
          />
        )
      )}
    </div>
  );
}

const primaryButton = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Deployments;