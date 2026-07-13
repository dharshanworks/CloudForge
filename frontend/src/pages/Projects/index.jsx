import { useState } from "react";

import { useProjects } from "../../hooks/useProjects";

import ProjectCard from "../../components/projects/ProjectCard";
import ProjectSearch from "../../components/projects/ProjectSearch";
import ProjectFilters from "../../components/projects/ProjectFilters";

function Projects() {
  const {
    projects,
    loading,
    error,
    refreshProjects,
  } = useProjects();

  // ============================
  // Search State
  // ============================

  const [searchTerm, setSearchTerm] = useState("");

  // ============================
  // Filter State
  // ============================

  const [cloudProvider, setCloudProvider] =
    useState("ALL");

  const [environment, setEnvironment] =
    useState("ALL");

  const [status, setStatus] = useState("ALL");

  // ============================
  // Search + Filter
  // ============================

  const filteredProjects = projects.filter(
    (project) => {
      const matchesSearch = project.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCloud =
        cloudProvider === "ALL" ||
        project.cloudProvider === cloudProvider;

      const matchesEnvironment =
        environment === "ALL" ||
        project.environment === environment;

      const matchesStatus =
        status === "ALL" ||
        project.status === status;

      return (
        matchesSearch &&
        matchesCloud &&
        matchesEnvironment &&
        matchesStatus
      );
    }
  );

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Projects...</h2>
      </div>
    );
  }

  // ============================
  // Error
  // ============================

  if (error) {
    return (
      <div style={{ padding: "30px" }}>
        <h2 style={{ color: "red" }}>
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
        padding: "30px",
      }}
    >
      <h1>📁 My Projects</h1>

      <p
        style={{
          color: "#6b7280",
          marginBottom: "20px",
        }}
      >
        Total Projects : {filteredProjects.length}
      </p>

      <ProjectSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <ProjectFilters
        cloudProvider={cloudProvider}
        setCloudProvider={setCloudProvider}
        environment={environment}
        setEnvironment={setEnvironment}
        status={status}
        setStatus={setStatus}
      />

      {filteredProjects.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
            marginTop: "20px",
          }}
        >
          <h2>📂 No Projects Found</h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Try changing your search or filter
            options.
          </p>
        </div>
      ) : (
        filteredProjects.map((project) => (
          <ProjectCard
            key={project._id}
            project={project}
            refreshProjects={refreshProjects}
          />
        ))
      )}
    </div>
  );
}

export default Projects;