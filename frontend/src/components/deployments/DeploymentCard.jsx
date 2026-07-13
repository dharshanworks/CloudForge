import { useNavigate } from "react-router-dom";

function DeploymentCard({
  deployment,
  onDelete,
}) {
  const navigate = useNavigate();

  function getStatusColor(status) {
    switch (status) {
      case "RUNNING":
        return "#16a34a";

      case "FAILED":
        return "#dc2626";

      case "DEPLOYING":
        return "#2563eb";

      case "BUILDING":
        return "#f59e0b";

      case "STOPPED":
        return "#6b7280";

      default:
        return "#9333ea";
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "16px",
        padding: "24px",
        marginBottom: "24px",
        boxShadow:
          "0 4px 15px rgba(0,0,0,0.08)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2
          style={{
            margin: 0,
          }}
        >
          🚀 {deployment.version}
        </h2>

        <span
          style={{
            background:
              getStatusColor(
                deployment.status
              ),
            color: "#ffffff",
            padding: "6px 14px",
            borderRadius: "20px",
            fontWeight: "600",
            fontSize: "13px",
          }}
        >
          {deployment.status}
        </span>
      </div>

      {/* Information */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2,1fr)",
          gap: "18px",
          marginBottom: "25px",
        }}
      >
        <div>
          <strong>
            🌍 Environment
          </strong>

          <div>
            {deployment.environment}
          </div>
        </div>

        <div>
          <strong>
            🐳 Docker Image
          </strong>

          <div
            style={{
              wordBreak:
                "break-word",
            }}
          >
            {deployment.dockerImage}
          </div>
        </div>

        <div>
          <strong>
            📅 Created
          </strong>

          <div>
            {new Date(
              deployment.createdAt
            ).toLocaleString()}
          </div>
        </div>

        <div>
          <strong>
            🕒 Updated
          </strong>

          <div>
            {new Date(
              deployment.updatedAt
            ).toLocaleString()}
          </div>
        </div>
      </div>

      <hr />

      {/* Actions */}

      <div
        style={{
          display: "flex",
          gap: "12px",
          marginTop: "20px",
          flexWrap: "wrap",
        }}
      >
        <button
          style={buttonBlue}
          onClick={() =>
            navigate(
              `./${deployment._id}`
            )
          }
        >
          👁 View
        </button>

        <button
          style={buttonYellow}
          onClick={() =>
            navigate(
              `./${deployment._id}/edit`
            )
          }
        >
          ✏ Edit
        </button>

        <button
          style={buttonRed}
          onClick={() =>
            onDelete(
              deployment._id
            )
          }
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

const buttonBlue = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

const buttonYellow = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#f59e0b",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

const buttonRed = {
  padding: "10px 18px",
  border: "none",
  borderRadius: "8px",
  backgroundColor: "#dc2626",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default DeploymentCard;