import { useNavigate } from "react-router-dom";

import {
  deletePipeline,
} from "../../api/pipeline.api";

function PipelineCard({
  pipeline,
  projectId,
  applicationId,
  onDelete,
}) {
  const navigate = useNavigate();

  async function handleDelete() {
    const confirmed = window.confirm(
      `Delete "${pipeline.name}" ?`
    );

    if (!confirmed) return;

    try {
      await deletePipeline(
        pipeline._id
      );

      alert(
        "Pipeline deleted successfully."
      );

      if (onDelete) {
        await onDelete();
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to delete pipeline."
      );
    }
  }

  function handleView() {
    navigate(
      `/projects/${projectId}/applications/${applicationId}/pipelines/${pipeline._id}`
    );
  }

  function handleEdit() {
    navigate(
      `/projects/${projectId}/applications/${applicationId}/pipelines/${pipeline._id}/edit`
    );
  }

  function handleRun() {
    navigate(
      `/pipelines/${pipeline._id}/executions`
    );
  }

  function getStatusColor(status) {
    switch (status) {
      case "SUCCESS":
        return "#16a34a";

      case "FAILED":
        return "#dc2626";

      case "RUNNING":
        return "#2563eb";

      case "CANCELLED":
        return "#6b7280";

      default:
        return "#f59e0b";
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        <h2>
          ⚙ {pipeline.name}
        </h2>

        <span
          style={{
            background:
              getStatusColor(
                pipeline.status
              ),
            color: "#ffffff",
            padding: "6px 14px",
            borderRadius: "30px",
            fontWeight: "600",
          }}
        >
          {pipeline.status}
        </span>
      </div>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        {pipeline.description ||
          "No description"}
      </p>

      <hr />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "20px",
          marginTop: "20px",
          marginBottom: "25px",
        }}
      >
        <div>
          <strong>
            Provider
          </strong>

          <div>
            {pipeline.provider}
          </div>
        </div>

        <div>
          <strong>
            Branch
          </strong>

          <div>
            {pipeline.branch}
          </div>
        </div>

        <div>
          <strong>
            Trigger
          </strong>

          <div>
            {pipeline.trigger}
          </div>
        </div>

        <div>
          <strong>
            Last Run
          </strong>

          <div>
            {pipeline.lastRun
              ? new Date(
                  pipeline.lastRun
                ).toLocaleString()
              : "Never"}
          </div>
        </div>
      </div>

      {/* Buttons */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={blue}
          onClick={handleView}
        >
          👁 View
        </button>

        <button
          style={yellow}
          onClick={handleEdit}
        >
          ✏ Edit
        </button>

        <button
          style={green}
          onClick={handleRun}
        >
          ▶ Run
        </button>

        <button
          style={red}
          onClick={handleDelete}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

const blue = {
  padding: "10px 18px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const yellow = {
  padding: "10px 18px",
  background: "#f59e0b",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const green = {
  padding: "10px 18px",
  background: "#16a34a",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const red = {
  padding: "10px 18px",
  background: "#dc2626",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default PipelineCard;