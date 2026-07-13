import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { createApplication } from "../../api/application.api";

function CreateApplication() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // ============================
  // Form State
  // ============================

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    repository: "",
    branch: "main",
    runtime: "NODEJS",
    framework: "",
    dockerImage: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ============================
  // Handle Input Change
  // ============================

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  // ============================
  // Submit
  // ============================

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    if (!formData.name.trim()) {
      setError("Application name is required.");
      return;
    }

    setLoading(true);

    try {
      await createApplication({
        ...formData,
        project: projectId,
      });

      alert("✅ Application created successfully.");

      navigate(`/projects/${projectId}/applications`);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create application."
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
        boxShadow: "0 5px 20px rgba(0,0,0,0.08)",
      }}
    >
      <h1>Create Application</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Add a new deployable application to this project.
      </p>

      {error && (
        <div
          style={{
            backgroundColor: "#fee2e2",
            color: "#b91c1c",
            padding: "12px",
            borderRadius: "8px",
            marginBottom: "25px",
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Application Name */}

        <label>
          <strong>Application Name</strong>
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="frontend"
          style={inputStyle}
        />

        {/* Description */}

        <label>
          <strong>Description</strong>
        </label>

        <textarea
          rows={4}
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Application description..."
          style={inputStyle}
        />

        {/* Repository */}

        <label>
          <strong>Repository URL</strong>
        </label>

        <input
          type="text"
          name="repository"
          value={formData.repository}
          onChange={handleChange}
          placeholder="https://github.com/your-org/repository"
          style={inputStyle}
        />

        {/* Branch */}

        <label>
          <strong>Branch</strong>
        </label>

        <input
          type="text"
          name="branch"
          value={formData.branch}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Runtime */}

        <label>
          <strong>Runtime</strong>
        </label>

        <select
          name="runtime"
          value={formData.runtime}
          onChange={handleChange}
          style={inputStyle}
        >
          <option value="NODEJS">Node.js</option>
          <option value="JAVA">Java</option>
          <option value="PYTHON">Python</option>
          <option value="GO">Go</option>
          <option value="DOTNET">.NET</option>
        </select>

        {/* Framework */}

        <label>
          <strong>Framework</strong>
        </label>

        <input
          type="text"
          name="framework"
          value={formData.framework}
          onChange={handleChange}
          placeholder="React / Spring Boot / Express"
          style={inputStyle}
        />

        {/* Docker Image */}

        <label>
          <strong>Docker Image</strong>
        </label>

        <input
          type="text"
          name="dockerImage"
          value={formData.dockerImage}
          onChange={handleChange}
          placeholder="cloudforge/frontend:v1"
          style={inputStyle}
        />

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            gap: "15px",
            marginTop: "35px",
          }}
        >
          <button
            type="button"
            onClick={() => navigate(-1)}
            style={secondaryButton}
            disabled={loading}
          >
            Cancel
          </button>

          <button
            type="submit"
            style={primaryButton}
            disabled={loading}
          >
            {loading
              ? "Creating..."
              : "Create Application"}
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

export default CreateApplication;