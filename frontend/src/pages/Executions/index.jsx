import { useParams } from "react-router-dom";

import {
  runPipeline,
} from "../../api/pipelineExecution.api";

import useExecutions from "../../hooks/useExecutions";

import ExecutionCard from "../../components/executions/ExecutionCard";

function Executions() {
  const { pipelineId } =
    useParams();

  const {
    executions,
    loading,
    error,
    fetchExecutions,
  } = useExecutions(
    pipelineId
  );

  async function handleRunPipeline() {
    try {
      await runPipeline(
        pipelineId
      );

      alert(
        "Pipeline execution started."
      );

      fetchExecutions();
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Unable to run pipeline."
      );
    }
  }

  if (loading) {
    return (
      <div
        style={{
          padding: "30px",
        }}
      >
        <h2>
          Loading executions...
        </h2>
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          padding: "30px",
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

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "40px auto",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>
            🚀 Pipeline Executions
          </h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Execution history
            of this pipeline.
          </p>
        </div>

        <button
          onClick={
            handleRunPipeline
          }
          style={primaryButton}
        >
          ▶ Run Pipeline
        </button>
      </div>

      {executions.length ===
        0 && (
        <div
          style={{
            background:
              "#ffffff",
            padding: "60px",
            borderRadius:
              "12px",
            textAlign:
              "center",
            border:
              "1px solid #e5e7eb",
          }}
        >
          <h2>
            No Executions
          </h2>

          <p>
            Run your first
            pipeline.
          </p>
        </div>
      )}

      {executions.map(
        (execution) => (
          <ExecutionCard
            key={
              execution._id
            }
            execution={
              execution
            }
            onDelete={
              fetchExecutions
            }
          />
        )
      )}
    </div>
  );
}

const primaryButton = {
  padding: "12px 24px",
  border: "none",
  borderRadius: "8px",
  backgroundColor:
    "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Executions;