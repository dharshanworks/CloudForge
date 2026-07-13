import { useNavigate } from "react-router-dom";

import { deleteProject } from "../../api/project.api";

import {
  STATUS_COLORS,
  CLOUD_COLORS,
  VISIBILITY_COLORS,
} from "../../constants/projectConstants";

function ProjectCard({
  project,
  refreshProjects,
}) {
  const navigate = useNavigate();

  // ============================
  // Delete Project
  // ============================

  async function handleDelete() {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${project.name}"?\n\nThis action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      await deleteProject(project._id);

      alert("✅ Project deleted successfully.");

      // Refresh Projects Automatically

      if (refreshProjects) {
        await refreshProjects();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete project."
      );
    }
  }

  return (
    <div
      style={{
        backgroundColor: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
        border: "1px solid #e5e7eb",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2
          style={{
            margin: 0,
            color: "#1f2937",
          }}
        >
          📁 {project.name}
        </h2>

        <span
          style={{
            backgroundColor:
              STATUS_COLORS[project.status] || "#6b7280",
            color: "#ffffff",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "13px",
            fontWeight: "bold",
          }}
        >
          {project.status}
        </span>
      </div>

      {/* Description */}

      <p
        style={{
          color: "#6b7280",
          lineHeight: "1.6",
          marginBottom: "20px",
        }}
      >
        {project.description || "No description available."}
      </p>

      {/* Information */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "16px",
          marginBottom: "20px",
        }}
      >
        <div>
          <strong>☁ Cloud Provider</strong>

          <div
            style={{
              marginTop: "6px",
              display: "inline-block",
              backgroundColor:
                CLOUD_COLORS[project.cloudProvider] ||
                "#6b7280",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            {project.cloudProvider}
          </div>
        </div>

        <div>
          <strong>🌍 Environment</strong>

          <div
            style={{
              marginTop: "6px",
              display: "inline-block",
              backgroundColor: "#f3f4f6",
              color: "#111827",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            {project.environment}
          </div>
        </div>

        <div>
          <strong>🔒 Visibility</strong>

          <div
            style={{
              marginTop: "6px",
              display: "inline-block",
              backgroundColor:
                VISIBILITY_COLORS[
                  project.visibility
                ] || "#6b7280",
              color: "#ffffff",
              padding: "6px 12px",
              borderRadius: "20px",
              fontSize: "13px",
            }}
          >
            {project.visibility}
          </div>
        </div>

        <div>
          <strong>📅 Created</strong>

          <div
            style={{
              marginTop: "6px",
              color: "#4b5563",
            }}
          >
            {new Date(
              project.createdAt
            ).toLocaleDateString()}
          </div>
        </div>
      </div>

      <hr
        style={{
          border: "none",
          borderTop: "1px solid #e5e7eb",
          marginBottom: "20px",
        }}
      />

      {/* Actions */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() =>
            navigate(`/projects/${project._id}`)
          }
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          👁 View
        </button>

        <button
          onClick={() =>
            navigate(
              `/projects/${project._id}/edit`
            )
          }
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#f59e0b",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          ✏ Edit
        </button>

        <button
          onClick={handleDelete}
          style={{
            padding: "10px 18px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#dc2626",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

export default ProjectCard;