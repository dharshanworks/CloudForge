import { useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  createPipeline,
} from "../../api/pipeline.api";

function CreatePipeline() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
  } = useParams();

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      repository: "",
      branch: "main",
      provider: "GITHUB_ACTIONS",
      trigger: "PUSH",
      defaultPipeline: false,
      isActive: true,
    });

  function handleChange(event) {
    const { name, value, type, checked } =
      event.target;

    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createPipeline({
        ...formData,
        application: applicationId,
      });

      alert(
        "Pipeline created successfully."
      );

      navigate(
        `/projects/${projectId}/applications/${applicationId}/pipelines`
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create pipeline."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background: "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1>
        ⚙ Create Pipeline
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Configure a new CI/CD pipeline.
      </p>

      {error && (
        <div
          style={{
            background: "#fee2e2",
            color: "#dc2626",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "20px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label>
          <strong>Pipeline Name</strong>
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          style={inputStyle}
        />

        <label>
          <strong>Description</strong>
        </label>

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          <strong>Repository</strong>
        </label>

        <input
          name="repository"
          value={formData.repository}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          <strong>Branch</strong>
        </label>

        <input
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          style={inputStyle}
        />

        <label>
          <strong>Provider</strong>
        </label>

        <select
          name="provider"
          value={formData.provider}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="GITHUB_ACTIONS">
            GitHub Actions
          </option>

          <option value="JENKINS">
            Jenkins
          </option>

          <option value="GITLAB_CI">
            GitLab CI
          </option>

          <option value="AZURE_DEVOPS">
            Azure DevOps
          </option>

          <option value="CIRCLE_CI">
            Circle CI
          </option>
        </select>

        <label>
          <strong>Trigger</strong>
        </label>

        <select
          name="trigger"
          value={formData.trigger}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="PUSH">
            Push
          </option>

          <option value="MANUAL">
            Manual
          </option>

          <option value="PULL_REQUEST">
            Pull Request
          </option>

          <option value="SCHEDULE">
            Schedule
          </option>
        </select>

        <div
          style={{
            marginTop: "20px",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="defaultPipeline"
              checked={
                formData.defaultPipeline
              }
              onChange={handleChange}
            />

            {" "}Default Pipeline
          </label>
        </div>

        <div
          style={{
            marginTop: "15px",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={
                formData.isActive
              }
              onChange={handleChange}
            />

            {" "}Pipeline Active
          </label>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: "15px",
            marginTop: "35px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              navigate(-1)
            }
            style={secondaryButton}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            style={primaryButton}
          >
            {loading
              ? "Creating..."
              : "Create Pipeline"}
          </button>
        </div>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  marginBottom: "20px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  boxSizing: "border-box",
};

const primaryButton = {
  padding: "12px 24px",
  backgroundColor: "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

const secondaryButton = {
  padding: "12px 24px",
  backgroundColor: "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "600",
};

export default CreatePipeline;