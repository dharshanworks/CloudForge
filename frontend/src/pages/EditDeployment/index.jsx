import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getDeployment,
  updateDeployment,
} from "../../api/deployment.api";

function EditDeployment() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
    deploymentId,
  } = useParams();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [error, setError] =
    useState("");

  const [formData, setFormData] =
    useState({
      version: "",
      environment: "DEVELOPMENT",
      dockerImage: "",
      status: "CREATED",
    });

  // ============================
  // Fetch Deployment
  // ============================

  async function fetchDeployment() {
    try {
      setLoading(true);

      const response =
        await getDeployment(
          deploymentId
        );

      const deployment =
        response.data;

      setFormData({
        version:
          deployment.version || "",

        environment:
          deployment.environment ||
          "DEVELOPMENT",

        dockerImage:
          deployment.dockerImage ||
          "",

        status:
          deployment.status ||
          "CREATED",
      });
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Unable to load deployment."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchDeployment();
  }, [deploymentId]);

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
      setSaving(true);
      setError("");

      await updateDeployment(
        deploymentId,
        formData
      );

      alert(
        "Deployment updated successfully."
      );

      navigate(
        `/projects/${projectId}/applications/${applicationId}/deployments`
      );
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Unable to update deployment."
      );
    } finally {
      setSaving(false);
    }
  }

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>
          Loading Deployment...
        </h2>
      </div>
    );
  }

  // ============================
  // UI
  // ============================

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
        ✏ Edit Deployment
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Update deployment
        information.
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
          style={inputStyle}
        />

        {/* Status */}

        <label>
          <strong>Status</strong>
        </label>

        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="CREATED">
            CREATED
          </option>

          <option value="BUILDING">
            BUILDING
          </option>

          <option value="DEPLOYING">
            DEPLOYING
          </option>

          <option value="RUNNING">
            RUNNING
          </option>

          <option value="FAILED">
            FAILED
          </option>

          <option value="STOPPED">
            STOPPED
          </option>

          <option value="ROLLED_BACK">
            ROLLED_BACK
          </option>
        </select>

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
            disabled={saving}
            style={primaryButton}
          >
            {saving
              ? "Updating..."
              : "Update Deployment"}
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

export default EditDeployment;