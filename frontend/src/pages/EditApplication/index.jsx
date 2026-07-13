import { useEffect, useState } from "react";
import {
  useNavigate,
  useParams,
} from "react-router-dom";

import {
  getApplication,
  updateApplication,
} from "../../api/application.api";

function EditApplication() {
  const navigate = useNavigate();

  const {
    projectId,
    applicationId,
  } = useParams();

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

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================
  // Fetch Application
  // ============================

  async function fetchApplication() {
    try {
      setLoading(true);

      const response =
        await getApplication(
          applicationId
        );

      const application =
        response.data;

      setFormData({
        name:
          application.name || "",

        description:
          application.description ||
          "",

        repository:
          application.repository ||
          "",

        branch:
          application.branch ||
          "main",

        runtime:
          application.runtime ||
          "NODEJS",

        framework:
          application.framework ||
          "",

        dockerImage:
          application.dockerImage ||
          "",
      });
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Unable to load application."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchApplication();
  }, [applicationId]);

  // ============================
  // Handle Input
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

      await updateApplication(
        applicationId,
        formData
      );

      alert(
        "✅ Application updated successfully."
      );

      navigate(
        `/projects/${projectId}/applications`
      );
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to update application."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>
          Loading Application...
        </h2>
      </div>
    );
  }

  // ============================
  // Error
  // ============================

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
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
        ✏ Edit Application
      </h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "30px",
        }}
      >
        Update your application
        information.
      </p>

      <form
        onSubmit={handleSubmit}
      >
        {/* Name */}

        <label>
          <strong>
            Application Name
          </strong>
        </label>

        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Description */}

        <label>
          <strong>
            Description
          </strong>
        </label>

        <textarea
          rows={4}
          name="description"
          value={
            formData.description
          }
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Repository */}

        <label>
          <strong>
            Repository
          </strong>
        </label>

        <input
          name="repository"
          value={
            formData.repository
          }
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Branch */}

        <label>
          <strong>Branch</strong>
        </label>

        <input
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
          <option value="NODEJS">
            Node.js
          </option>

          <option value="JAVA">
            Java
          </option>

          <option value="PYTHON">
            Python
          </option>

          <option value="GO">
            Go
          </option>

          <option value="DOTNET">
            .NET
          </option>
        </select>

        {/* Framework */}

        <label>
          <strong>
            Framework
          </strong>
        </label>

        <input
          name="framework"
          value={
            formData.framework
          }
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Docker Image */}

        <label>
          <strong>
            Docker Image
          </strong>
        </label>

        <input
          name="dockerImage"
          value={
            formData.dockerImage
          }
          onChange={handleChange}
          style={inputStyle}
        />

        {/* Buttons */}

        <div
          style={{
            display: "flex",
            justifyContent:
              "flex-end",
            gap: "15px",
            marginTop: "30px",
          }}
        >
          <button
            type="button"
            onClick={() =>
              navigate(
                `/projects/${projectId}/applications`
              )
            }
            style={secondaryButton}
          >
            Cancel
          </button>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...primaryButton,
              opacity: loading
                ? 0.7
                : 1,
              cursor: loading
                ? "not-allowed"
                : "pointer",
            }}
          >
            {loading
              ? "Updating..."
              : "Update Application"}
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

export default EditApplication;