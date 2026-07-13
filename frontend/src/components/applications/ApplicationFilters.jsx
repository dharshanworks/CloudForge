function ApplicationFilters({
  runtime,
  setRuntime,
  status,
  setStatus,
}) {
  return (
    <div
      style={{
        display: "flex",
        gap: "15px",
        marginBottom: "25px",
        flexWrap: "wrap",
      }}
    >
      {/* Runtime */}

      <select
        value={runtime}
        onChange={(event) =>
          setRuntime(event.target.value)
        }
        style={selectStyle}
      >
        <option value="ALL">
          All Runtime
        </option>

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

      {/* Status */}

      <select
        value={status}
        onChange={(event) =>
          setStatus(event.target.value)
        }
        style={selectStyle}
      >
        <option value="ALL">
          All Status
        </option>

        <option value="CREATED">
          Created
        </option>

        <option value="BUILDING">
          Building
        </option>

        <option value="DEPLOYING">
          Deploying
        </option>

        <option value="RUNNING">
          Running
        </option>

        <option value="FAILED">
          Failed
        </option>

        <option value="STOPPED">
          Stopped
        </option>
      </select>
    </div>
  );
}

const selectStyle = {
  padding: "12px",
  minWidth: "220px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  fontSize: "15px",
};

export default ApplicationFilters;