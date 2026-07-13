import {
  useEffect,
  useState,
} from "react";

import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getExecution,
} from "../../api/pipelineExecution.api";

import ExecutionSummary from "../../components/executions/ExecutionSummary";
import ExecutionProgressBar from "../../components/executions/ExecutionProgressBar";
import ExecutionStageCard from "../../components/executions/ExecutionStageCard";
import ExecutionLogs from "../../components/executions/ExecutionLogs";

function ExecutionDetails() {
  const navigate = useNavigate();

  const { executionId } =
    useParams();

  const [execution, setExecution] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===========================================
  // Fetch Execution
  // ===========================================

  async function fetchExecution() {
    try {
      const response =
        await getExecution(
          executionId
        );

      setExecution(
        response.data
      );

      setError("");
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Unable to load execution."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===========================================
  // Initial Load
  // ===========================================

  useEffect(() => {
    fetchExecution();
  }, [executionId]);

  // ===========================================
  // Auto Refresh
  // ===========================================

  useEffect(() => {
    if (!execution) return;

    if (
      execution.status ===
        "SUCCESS" ||
      execution.status ===
        "FAILED" ||
      execution.status ===
        "CANCELLED"
    ) {
      return;
    }

    const interval =
      setInterval(() => {
        fetchExecution();
      }, 2000);

    return () =>
      clearInterval(interval);
  }, [execution]);

  // ===========================================
  // Loading
  // ===========================================

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2>
          Loading Execution...
        </h2>
      </div>
    );
  }

  // ===========================================
  // Error
  // ===========================================

  if (error) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2
          style={{
            color: "red",
          }}
        >
          {error}
        </h2>
      </div>
    );
  }

  // ===========================================
  // UI
  // ===========================================

  return (
    <div
      style={{
        maxWidth: "1300px",
        margin: "40px auto",
        padding: "20px",
      }}
    >
      <button
        onClick={() =>
          navigate(-1)
        }
        style={backButton}
      >
        ← Back
      </button>

      <h1
        style={{
          marginBottom: "30px",
        }}
      >
        🚀 Pipeline Execution
      </h1>

      <ExecutionSummary
        execution={execution}
      />

      <ExecutionProgressBar
        execution={execution}
      />

      <h2
        style={{
          marginBottom: "20px",
        }}
      >
        Pipeline Stages
      </h2>
            {execution.stages?.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #e5e7eb",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center",
          }}
        >
          <h3>No stages available.</h3>
        </div>
      )}

      {execution.stages?.map(
        (stage, index) => (
          <ExecutionStageCard
            key={index}
            stage={stage}
            index={index}
          />
        )
      )}

      <ExecutionLogs
        logs={execution.logs}
      />
    </div>
  );
}

const backButton = {
  padding: "10px 18px",
  background: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  marginBottom: "20px",
  fontWeight: "600",
};

export default ExecutionDetails;