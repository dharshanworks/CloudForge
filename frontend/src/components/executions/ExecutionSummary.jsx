function ExecutionSummary({ execution }) {
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

      default:
        return "#6b7280";
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "25px",
        marginBottom: "30px",
      }}
    >
      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        📋 Execution Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
        }}
      >
        <SummaryItem
          title="Pipeline"
          value={
            execution.pipeline?.name ||
            "-"
          }
        />

        <SummaryItem
          title="Triggered By"
          value={
            execution.triggeredBy
              ?.name || "-"
          }
        />

        <SummaryItem
          title="Status"
          value={
            execution.status
          }
          color={getStatusColor(
            execution.status
          )}
        />

        <SummaryItem
          title="Started"
          value={
            execution.startedAt
              ? new Date(
                  execution.startedAt
                ).toLocaleString()
              : "-"
          }
        />

        <SummaryItem
          title="Finished"
          value={
            execution.finishedAt
              ? new Date(
                  execution.finishedAt
                ).toLocaleString()
              : "-"
          }
        />

        <SummaryItem
          title="Duration"
          value={`${execution.duration} sec`}
        />
      </div>
    </div>
  );
}

function SummaryItem({
  title,
  value,
  color,
}) {
  return (
    <div>
      <div
        style={{
          color: "#6b7280",
          fontSize: "14px",
        }}
      >
        {title}
      </div>

      <div
        style={{
          marginTop: "8px",
          fontWeight: "600",
          color:
            color || "#111827",
          fontSize: "18px",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default ExecutionSummary;