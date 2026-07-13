import { useState } from "react";
import { createProject } from "../../api/project.api";
import { useNavigate } from "react-router-dom";

function CreateProject() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    cloudProvider: "AWS",
    environment: "DEVELOPMENT",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      await createProject(formData);

      alert("✅ Project Created Successfully");

      navigate("/projects");
    } catch (error) {
      console.log(error.response?.data);

      setError(
        error.response?.data?.message ||
        "Unable to create project."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "40px auto",
      }}
    >
      <h1>Create Project</h1>

      {error && (
        <p style={{ color: "red" }}>
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Project Name"
          value={formData.name}
          onChange={handleChange}
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Project Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br /><br />

        <select
          name="cloudProvider"
          value={formData.cloudProvider}
          onChange={handleChange}
        >
          <option value="AWS">AWS</option>
          <option value="AZURE">Azure</option>
          <option value="GCP">Google Cloud</option>
        </select>

        <br /><br />

        <select
          name="environment"
          value={formData.environment}
          onChange={handleChange}
        >
          <option value="DEVELOPMENT">Development</option>
          <option value="STAGING">Staging</option>
          <option value="PRODUCTION">Production</option>
        </select>

        <br /><br />

        <button
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Project"}
        </button>
      </form>
    </div>
  );
}

export default CreateProject;