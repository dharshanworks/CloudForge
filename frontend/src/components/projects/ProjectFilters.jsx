function ProjectFilters({
  cloudProvider,
  setCloudProvider,
  environment,
  setEnvironment,
  status,
  setStatus,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        marginBottom: "30px",
        flexWrap: "wrap",
      }}
    >
      {/* Cloud */}

      <select
        value={cloudProvider}
        onChange={(event) =>
          setCloudProvider(event.target.value)
        }
      >
        <option value="ALL">All Clouds</option>
        <option value="AWS">AWS</option>
        <option value="AZURE">Azure</option>
        <option value="GCP">Google Cloud</option>
      </select>

      {/* Environment */}

      <select
        value={environment}
        onChange={(event) =>
          setEnvironment(event.target.value)
        }
      >
        <option value="ALL">All Environments</option>
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

      {/* Status */}

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value)
        }
      >
        <option value="ALL">All Status</option>
        <option value="ACTIVE">Active</option>
        <option value="ARCHIVED">
          Archived
        </option>
      </select>
    </div>
  );
}

export default ProjectFilters;