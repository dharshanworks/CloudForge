import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getProject,
  updateProject,
} from "../../api/project.api";

function EditProject() {
  // ============================
  // Hooks
  // ============================

  const { projectId } = useParams();

  const navigate = useNavigate();

  // ============================
  // State
  // ============================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cloudProvider: "AWS",
    environment: "DEVELOPMENT",
    visibility: "PRIVATE",
  });

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  // ============================
  // Fetch Project
  // ============================

  async function fetchProject() {
    try {
      setLoading(true);

      const response = await getProject(projectId);

      const project = response.data;

      setFormData({
        name: project.name || "",
        description: project.description || "",
        cloudProvider: project.cloudProvider || "AWS",
        environment:
          project.environment || "DEVELOPMENT",
        visibility: project.visibility || "PRIVATE",
      });
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load project."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Handle Change
  // ============================

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // ============================
  // Update Project
  // ============================

  async function handleUpdate(event) {
    event.preventDefault();

    try {
      setSaving(true);

      await updateProject(
        projectId,
        formData
      );

      alert("✅ Project Updated Successfully");

      navigate("/projects");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update project."
      );
    } finally {
      setSaving(false);
    }
  }

  // ============================

  useEffect(() => {
    fetchProject();
  }, []);

  // ============================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Project...</h2>
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
    <form
      onSubmit={handleUpdate}
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        backgroundColor: "#ffffff",
        padding: "30px",
        borderRadius: "12px",
        boxShadow:
          "0 2px 10px rgba(0,0,0,0.08)",
      }}
    >
      <h1>✏ Edit Project</h1>

      <hr style={{ margin: "20px 0" }} />

      <label>
        <strong>Project Name</strong>
      </label>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <label>
        <strong>Description</strong>
      </label>

      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={4}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
          boxSizing: "border-box",
        }}
      />

      <label>
        <strong>Cloud Provider</strong>
      </label>

      <select
        name="cloudProvider"
        value={formData.cloudProvider}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      >
        <option value="AWS">AWS</option>
        <option value="AZURE">Azure</option>
        <option value="GCP">Google Cloud</option>
      </select>

      <label>
        <strong>Environment</strong>
      </label>

      <select
        name="environment"
        value={formData.environment}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "20px",
        }}
      >
        <option value="DEVELOPMENT">
          Development
        </option>

        <option value="STAGING">
          Staging
        </option>

        <option value="PRODUCTION">
          Production
        </option>
      </select>

      <label>
        <strong>Visibility</strong>
      </label>

      <select
        name="visibility"
        value={formData.visibility}
        onChange={handleChange}
        style={{
          width: "100%",
          padding: "12px",
          marginTop: "8px",
          marginBottom: "30px",
        }}
      >
        <option value="PRIVATE">
          Private
        </option>

        <option value="PUBLIC">
          Public
        </option>
      </select>

      <button
        type="submit"
        disabled={saving}
        style={{
          width: "100%",
          padding: "14px",
          border: "none",
          borderRadius: "8px",
          backgroundColor: saving
            ? "#93c5fd"
            : "#2563eb",
          color: "#ffffff",
          fontSize: "16px",
          fontWeight: "600",
          cursor: saving
            ? "not-allowed"
            : "pointer",
        }}
      >
        {saving
          ? "Updating..."
          : "Update Project"}
      </button>
    </form>
  );
}

export default EditProject;