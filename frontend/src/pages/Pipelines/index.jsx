import { useNavigate, useParams } from "react-router-dom";

import usePipelines from "../../hooks/usePipelines";
import PipelineCard from "../../components/pipelines/PipelineCard";

function Pipelines() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
  } = useParams();

  const {
    pipelines,
    loading,
    error,
    fetchPipelines,
  } = usePipelines({
    applicationId,
  });

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Pipelines...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2 style={{ color: "red" }}>
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
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
        }}
      >
        <div>
          <h1>⚙ Pipelines</h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Manage CI/CD pipelines for this application.
          </p>
        </div>

        <button
          style={primaryButton}
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/${applicationId}/pipelines/create`
            )
          }
        >
          + Create Pipeline
        </button>
      </div>

      {/* Empty State */}

      {!loading && pipelines.length === 0 && (
        <div
          style={{
            background: "#ffffff",
            padding: "60px",
            borderRadius: "12px",
            border: "1px solid #e5e7eb",
            textAlign: "center",
          }}
        >
          <h2>No Pipelines Found</h2>

          <p>Create your first CI/CD Pipeline.</p>
        </div>
      )}

      {/* Pipeline List */}

      {pipelines.map((pipeline) => (
        <PipelineCard
          key={pipeline._id}
          pipeline={pipeline}
          projectId={projectId}
          applicationId={applicationId}
          onDelete={fetchPipelines}
        />
      ))}
    </div>
  );
}

const primaryButton = {
  padding: "12px 22px",
  border: "none",
  borderRadius: "8px",
  background: "#2563eb",
  color: "#ffffff",
  cursor: "pointer",
  fontWeight: "600",
};

export default Pipelines;