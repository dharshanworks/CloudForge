import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { getProject } from "../../api/project.api";

function ProjectDetails() {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProject() {
    try {
      setLoading(true);

      const response = await getProject(projectId);

      setProject(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load project."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  if (loading) {
    return (
      <h2 style={{ padding: "30px" }}>
        Loading Project...
      </h2>
    );
  }

  if (error) {
    return (
      <h2
        style={{
          color: "red",
          padding: "30px",
        }}
      >
        {error}
      </h2>
    );
  }

  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1000px",
        margin: "0 auto",
      }}
    >
      {/* Back Button */}

      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "20px",
          cursor: "pointer",
        }}
      >
        ← Back
      </button>

      {/* Project Details */}

      <h1>{project.name}</h1>

      <p>{project.description}</p>

      <hr />

      <h3>☁ Cloud Provider</h3>
      <p>{project.cloudProvider}</p>

      <h3>🌍 Environment</h3>
      <p>{project.environment}</p>

      <h3>📊 Status</h3>
      <p>{project.status}</p>

      <h3>🔒 Visibility</h3>
      <p>{project.visibility}</p>

      <h3>🔗 Git Repository</h3>
      <p>
        {project.gitRepository ||
          "Not Configured"}
      </p>

      <h3>📅 Created At</h3>
      <p>
        {new Date(
          project.createdAt
        ).toLocaleString()}
      </p>

      <h3>🕒 Last Updated</h3>
      <p>
        {new Date(
          project.updatedAt
        ).toLocaleString()}
      </p>

      <hr
        style={{
          margin: "40px 0",
        }}
      />

      {/* ============================
          Application Management
      ============================ */}

      <h2>
        🚀 Application Management
      </h2>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "25px",
        }}
      >
        Applications are deployable
        services inside this project.
      </p>

      {/* Action Buttons */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          flexWrap: "wrap",
          marginBottom: "30px",
        }}
      >
        <button
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/create`
            )
          }
          style={primaryButton}
        >
          ➕ Create Application
        </button>

        <button
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications`
            )
          }
          style={secondaryButton}
        >
          📋 View Applications
        </button>
      </div>

      {/* Empty State */}

      <div
        style={{
          backgroundColor: "#ffffff",
          border: "1px solid #e5e7eb",
          borderRadius: "12px",
          padding: "30px",
          textAlign: "center",
        }}
      >
        <h3>No Applications Yet</h3>

        <p
          style={{
            color: "#6b7280",
          }}
        >
          Create your first application
          to start managing deployments,
          Docker images, Kubernetes,
          logs and monitoring.
        </p>
      </div>
    </div>
  );
}

/* ============================
   Button Styles
============================ */

const primaryButton = {
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButton = {
  backgroundColor: "#374151",
  color: "#ffffff",
  border: "none",
  padding: "12px 20px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default ProjectDetails;