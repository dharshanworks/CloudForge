import { useEffect, useRef } from "react";

function ExecutionLogs({
  logs = [],
}) {
  const logContainerRef =
    useRef(null);

  useEffect(() => {
    if (
      logContainerRef.current
    ) {
      logContainerRef.current.scrollTop =
        logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  function getLogColor(level) {
    switch (level) {
      case "SUCCESS":
        return "#22c55e";

      case "ERROR":
        return "#ef4444";

      case "WARNING":
        return "#f59e0b";

      default:
        return "#60a5fa";
    }
  }

  function copyLogs() {
    const text = logs
      .map((log) => {
        const time = log.timestamp
          ? new Date(
              log.timestamp
            ).toLocaleTimeString()
          : "--";

        return `[${time}] [${log.level}] ${log.message}`;
      })
      .join("\n");

    navigator.clipboard.writeText(
      text
    );

    alert(
      "Logs copied successfully."
    );
  }

  return (
    <div
      style={{
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        padding: "25px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <h2>
          📜 Execution Logs
        </h2>

        <button
          onClick={copyLogs}
          style={button}
        >
          📋 Copy Logs
        </button>
      </div>

      <div
        ref={logContainerRef}
        style={{
          background: "#111827",
          color: "#22c55e",
          borderRadius: "10px",
          padding: "20px",
          height: "420px",
          overflowY: "auto",
          fontFamily:
            "Consolas, monospace",
          fontSize: "14px",
        }}
      >
        {logs.length === 0 && (
          <div
            style={{
              color: "#9ca3af",
            }}
          >
            Waiting for pipeline
            logs...
          </div>
        )}

        {logs.map(
          (log, index) => (
            <div
              key={index}
              style={{
                marginBottom:
                  "12px",
              }}
            >
              <span
                style={{
                  color:
                    "#9ca3af",
                }}
              >
                [
                {log.timestamp
                  ? new Date(
                      log.timestamp
                    ).toLocaleTimeString()
                  : "--"}
                ]
              </span>

              {" "}

              <span
                style={{
                  color:
                    getLogColor(
                      log.level
                    ),
                  fontWeight:
                    "600",
                }}
              >
                [
                {log.level}
                ]
              </span>

              {" "}

              <span>
                {log.message}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

const button = {
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  padding: "10px 18px",
  cursor: "pointer",
};

export default ExecutionLogs;