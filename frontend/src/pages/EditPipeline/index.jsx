import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import usePipelines from "../../hooks/usePipelines";

import {
  updatePipeline,
} from "../../api/pipeline.api";

function EditPipeline() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
    pipelineId,
  } = useParams();

  const {
    pipeline,
    loading,
    error,
  } = usePipeline(pipelineId);

  const [formData, setFormData] =
    useState({
      name: "",
      description: "",
      repository: "",
      branch: "",
      provider: "GITHUB_ACTIONS",
      trigger: "PUSH",
      isActive: true,
      defaultPipeline: false,
    });

  const [
    saving,
    setSaving,
  ] = useState(false);

  const [
    formError,
    setFormError,
  ] = useState("");

  useEffect(() => {
    if (pipeline) {
      setFormData({
        name:
          pipeline.name || "",
        description:
          pipeline.description || "",
        repository:
          pipeline.repository || "",
        branch:
          pipeline.branch || "",
        provider:
          pipeline.provider ||
          "GITHUB_ACTIONS",
        trigger:
          pipeline.trigger ||
          "PUSH",
        isActive:
          pipeline.isActive ??
          true,
        defaultPipeline:
          pipeline.defaultPipeline ??
          false,
      });
    }
  }, [pipeline]);

  function handleChange(
    event
  ) {
    const {
      name,
      value,
      type,
      checked,
    } = event.target;

    setFormData({
      ...formData,
      [name]:
        type ===
        "checkbox"
          ? checked
          : value,
    });
  }

  async function handleSubmit(
    event
  ) {
    event.preventDefault();

    try {
      setSaving(true);
      setFormError("");

      await updatePipeline(
        pipelineId,
        formData
      );

      alert(
        "Pipeline updated successfully."
      );

      navigate(
        `/projects/${projectId}/applications/${applicationId}/pipelines/${pipelineId}`
      );
    } catch (error) {
      setFormError(
        error.response?.data
          ?.message ||
          "Unable to update pipeline."
      );
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div
        style={{
          padding: "40px",
        }}
      >
        <h2>
          Loading Pipeline...
        </h2>
      </div>
    );
  }

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

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        background:
          "#ffffff",
        padding: "40px",
        borderRadius: "12px",
        boxShadow:
          "0 5px 20px rgba(0,0,0,.08)",
      }}
    >
      <h1>
        ✏ Edit Pipeline
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom:
            "25px",
        }}
      >
        Update your
        pipeline
        configuration.
      </p>

      {formError && (
        <div
          style={{
            background:
              "#fee2e2",
            color:
              "#dc2626",
            padding:
              "12px",
            borderRadius:
              "8px",
            marginBottom:
              "20px",
          }}
        >
          {formError}
        </div>
      )}

      <form
        onSubmit={
          handleSubmit
        }
      >
        <label>
          Pipeline Name
        </label>

        <input
          style={inputStyle}
          name="name"
          value={
            formData.name
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          Description
        </label>

        <textarea
          style={inputStyle}
          rows={4}
          name="description"
          value={
            formData.description
          }
          onChange={
            handleChange
          }
        />

        <label>
          Repository
        </label>

        <input
          style={inputStyle}
          name="repository"
          value={
            formData.repository
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          Branch
        </label>

        <input
          style={inputStyle}
          name="branch"
          value={
            formData.branch
          }
          onChange={
            handleChange
          }
          required
        />

        <label>
          Provider
        </label>

        <select
          style={inputStyle}
          name="provider"
          value={
            formData.provider
          }
          onChange={
            handleChange
          }
        >
          <option value="GITHUB_ACTIONS">
            GitHub
            Actions
          </option>

          <option value="JENKINS">
            Jenkins
          </option>

          <option value="GITLAB">
            GitLab CI
          </option>

          <option value="AZURE_DEVOPS">
            Azure
            DevOps
          </option>
        </select>

        <label>
          Trigger
        </label>

        <select
          style={inputStyle}
          name="trigger"
          value={
            formData.trigger
          }
          onChange={
            handleChange
          }
        >
          <option value="PUSH">
            Push
          </option>

          <option value="MANUAL">
            Manual
          </option>

          <option value="SCHEDULE">
            Schedule
          </option>
        </select>

        <div
          style={{
            marginTop:
              "20px",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={
                formData.isActive
              }
              onChange={
                handleChange
              }
            />{" "}
            Active
          </label>
        </div>

        <div
          style={{
            marginTop:
              "10px",
          }}
        >
          <label>
            <input
              type="checkbox"
              name="defaultPipeline"
              checked={
                formData.defaultPipeline
              }
              onChange={
                handleChange
              }
            />{" "}
            Default
            Pipeline
          </label>
        </div>

        <div
          style={{
            display:
              "flex",
            justifyContent:
              "flex-end",
            gap: "15px",
            marginTop:
              "35px",
          }}
        >
          <button
            type="button"
            style={
              secondaryButton
            }
            onClick={() =>
              navigate(-1)
            }
          >
            Cancel
          </button>

          <button
            type="submit"
            style={
              primaryButton
            }
            disabled={
              saving
            }
          >
            {saving
              ? "Updating..."
              : "Update Pipeline"}
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
  border:
    "1px solid #d1d5db",
  boxSizing:
    "border-box",
};

const primaryButton = {
  padding: "12px 24px",
  background:
    "#2563eb",
  color: "#ffffff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

const secondaryButton = {
  padding: "12px 24px",
  background:
    "#e5e7eb",
  color: "#111827",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
};

export default EditPipeline;