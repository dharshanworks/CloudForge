function ExecutionProgressBar({
  execution,
}) {
  const totalStages =
    execution.stages?.length || 0;

  const completedStages =
    execution.stages?.filter(
      (stage) =>
        stage.status ===
          "SUCCESS" ||
        stage.status ===
          "FAILED" ||
        stage.status ===
          "SKIPPED"
    ).length || 0;

  const percentage =
    totalStages === 0
      ? 0
      : Math.round(
          (completedStages /
            totalStages) *
            100
        );

  function getProgressColor() {
    switch (
      execution.status
    ) {
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
          📈 Overall Progress
        </h2>

        <strong>
          {percentage}%
        </strong>
      </div>

      <div
        style={{
          width: "100%",
          height: "18px",
          background:
            "#e5e7eb",
          borderRadius: "999px",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: "100%",
            background:
              getProgressColor(),
            transition:
              "width .5s ease",
          }}
        />
      </div>

      <div
        style={{
          marginTop: "15px",
          display: "flex",
          justifyContent:
            "space-between",
          color: "#6b7280",
        }}
      >
        <span>
          Completed Stages
        </span>

        <span>
          {completedStages} /{" "}
          {totalStages}
        </span>
      </div>
    </div>
  );
}

export default ExecutionProgressBar;