import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createDeployment } from "../../api/deployment.api";

function CreateDeployment() {
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
      version: "",
      environment: "DEVELOPMENT",
      dockerImage: "",
    });

  // ============================
  // Handle Change
  // ============================

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]:
        event.target.value,
    });
  }

  // ============================
  // Submit
  // ============================

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      setLoading(true);
      setError("");

      await createDeployment({
        application: applicationId,
        ...formData,
      });

      alert(
        "Deployment created successfully."
      );

      navigate(
        `/projects/${projectId}/applications/${applicationId}/deployments`
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create deployment."
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
        🚀 Create Deployment
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Deploy a new version of your
        application.
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

      <form
        onSubmit={handleSubmit}
      >
        {/* Version */}

        <label>
          <strong>Version</strong>
        </label>

        <input
          type="text"
          name="version"
          value={formData.version}
          onChange={handleChange}
          placeholder="v1.0.0"
          required
          style={inputStyle}
        />

        {/* Environment */}

        <label>
          <strong>
            Environment
          </strong>
        </label>

        <select
          name="environment"
          value={
            formData.environment
          }
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="DEVELOPMENT">
            DEVELOPMENT
          </option>

          <option value="STAGING">
            STAGING
          </option>

          <option value="PRODUCTION">
            PRODUCTION
          </option>
        </select>

        {/* Docker Image */}

        <label>
          <strong>
            Docker Image
          </strong>
        </label>

        <input
          type="text"
          name="dockerImage"
          value={
            formData.dockerImage
          }
          onChange={handleChange}
          placeholder="cloudforge/frontend:v1.0.0"
          required
          style={inputStyle}
        />

        {/* Buttons */}

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
              : "Create Deployment"}
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

export default CreateDeployment;