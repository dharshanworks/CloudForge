function ExecutionStageCard({
  stage,
  index,
}) {
  function getStatusColor(status) {
    switch (status) {
      case "SUCCESS":
        return "#16a34a";

      case "FAILED":
        return "#dc2626";

      case "RUNNING":
        return "#2563eb";

      case "PENDING":
        return "#9ca3af";

      case "SKIPPED":
        return "#6b7280";

      default:
        return "#6b7280";
    }
  }

  function getStatusIcon(status) {
    switch (status) {
      case "SUCCESS":
        return "✅";

      case "FAILED":
        return "❌";

      case "RUNNING":
        return "🟢";

      case "PENDING":
        return "⏳";

      case "SKIPPED":
        return "⏭";

      default:
        return "⚪";
    }
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderLeft: `6px solid ${getStatusColor(
          stage.status
        )}`,
        borderRadius: "12px",
        padding: "20px",
        marginBottom: "20px",
        boxShadow:
          "0 4px 10px rgba(0,0,0,.05)",
      }}
    >
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3
            style={{
              margin: 0,
            }}
          >
            {index + 1}.{" "}
            {stage.name}
          </h3>
        </div>

        <div
          style={{
            fontWeight: "600",
            color:
              getStatusColor(
                stage.status
              ),
          }}
        >
          {getStatusIcon(
            stage.status
          )}{" "}
          {stage.status}
        </div>
      </div>

      <hr
        style={{
          margin: "15px 0",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <Info
          title="Started"
          value={
            stage.startedAt
              ? new Date(
                  stage.startedAt
                ).toLocaleTimeString()
              : "-"
          }
        />

        <Info
          title="Finished"
          value={
            stage.finishedAt
              ? new Date(
                  stage.finishedAt
                ).toLocaleTimeString()
              : "-"
          }
        />

        <Info
          title="Duration"
          value={`${stage.duration} sec`}
        />
      </div>

      {stage.logs?.length >
        0 && (
        <>
          <hr
            style={{
              margin:
                "18px 0",
            }}
          />

          <h4>
            Stage Logs
          </h4>

          <div
            style={{
              background:
                "#111827",
              color:
                "#22c55e",
              padding:
                "15px",
              borderRadius:
                "10px",
              maxHeight:
                "180px",
              overflowY:
                "auto",
              fontFamily:
                "monospace",
            }}
          >
            {stage.logs.map(
              (
                log,
                logIndex
              ) => (
                <div
                  key={
                    logIndex
                  }
                >
                  {log}
                </div>
              )
            )}
          </div>
        </>
      )}
    </div>
  );
}

function Info({
  title,
  value,
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
          marginTop: "6px",
          fontWeight: "600",
        }}
      >
        {value}
      </div>
    </div>
  );
}

export default ExecutionStageCard;