import { useNavigate } from "react-router-dom";

import {
  deleteExecution,
} from "../../api/pipelineExecution.api";

function ExecutionCard({
  execution,
  onDelete,
}) {
  const navigate = useNavigate();

  async function handleDelete() {
    const confirmDelete =
      window.confirm(
        "Delete this execution?"
      );

    if (!confirmDelete) {
      return;
    }

    try {
      await deleteExecution(
        execution._id
      );

      alert(
        "Execution deleted successfully."
      );

      if (onDelete) {
        onDelete();
      }
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Unable to delete execution."
      );
    }
  }

  function getStatusColor(status) {
    switch (status) {
      case "SUCCESS":
        return "#16a34a";

      case "FAILED":
        return "#dc2626";

      case "RUNNING":
        return "#2563eb";

      case "QUEUED":
        return "#d97706";

      case "CANCELLED":
        return "#6b7280";

      default:
        return "#374151";
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: "12px",
        padding: "25px",
        marginBottom: "20px",
        boxShadow:
          "0 4px 12px rgba(0,0,0,.08)",
      }}
    >
      <h2>
        🚀 Execution
      </h2>

      <p>
        <strong>ID:</strong>{" "}
        {execution._id}
      </p>

      <p>
        <strong>Status:</strong>{" "}
        <span
          style={{
            color: getStatusColor(
              execution.status
            ),
            fontWeight: "700",
          }}
        >
          {execution.status}
        </span>
      </p>

      <p>
        <strong>Started:</strong>{" "}
        {execution.startedAt
          ? new Date(
              execution.startedAt
            ).toLocaleString()
          : "-"}
      </p>

      <p>
        <strong>Finished:</strong>{" "}
        {execution.finishedAt
          ? new Date(
              execution.finishedAt
            ).toLocaleString()
          : "-"}
      </p>

      <p>
        <strong>Duration:</strong>{" "}
        {execution.duration || 0} ms
      </p>

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "25px",
        }}
      >
        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              `/pipeline-executions/${execution._id}`
            )
          }
        >
          View
        </button>

        <button
          style={dangerButton}
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

const primaryButton = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

const dangerButton = {
  padding: "10px 20px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#dc2626",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default ExecutionCard;