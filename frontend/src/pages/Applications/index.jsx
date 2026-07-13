import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useApplications } from "../../hooks/useApplications";

import ApplicationCard from "../../components/applications/ApplicationCard";
import ApplicationSearch from "../../components/applications/ApplicationSearch";
import ApplicationFilters from "../../components/applications/ApplicationFilters";

function Applications() {
  const navigate = useNavigate();
  const { projectId } = useParams();

  // ============================
  // Search State
  // ============================

  const [searchTerm, setSearchTerm] = useState("");

  // ============================
  // Filter State
  // ============================

  const [runtime, setRuntime] = useState("ALL");

  const [status, setStatus] = useState("ALL");

  // ============================
  // Custom Hook
  // ============================

  const {
    applications,
    loading,
    error,
    fetchApplications,
  } = useApplications(projectId);

  // ============================
  // Search + Filter
  // ============================

  const filteredApplications =
    applications.filter((application) => {
      const matchesSearch =
        application.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesRuntime =
        runtime === "ALL" ||
        application.runtime === runtime;

      const matchesStatus =
        status === "ALL" ||
        application.status === status;

      return (
        matchesSearch &&
        matchesRuntime &&
        matchesStatus
      );
    });

  // ============================
  // Loading
  // ============================

  if (loading) {
    return (
      <div style={{ padding: "30px" }}>
        <h2>Loading Applications...</h2>
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
      {/* Header */}

      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: "20px",
        }}
      >
        <div>
          <h1>📦 Applications</h1>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Total Applications :
            {" "}
            {filteredApplications.length}
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              `/projects/${projectId}/applications/create`
            )
          }
          style={{
            padding: "12px 20px",
            border: "none",
            borderRadius: "8px",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          + Create Application
        </button>
      </div>

      {/* Search */}

      <ApplicationSearch
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Filters */}

      <ApplicationFilters
        runtime={runtime}
        setRuntime={setRuntime}
        status={status}
        setStatus={setStatus}
      />

      {/* Empty */}

      {filteredApplications.length === 0 ? (
        <div
          style={{
            backgroundColor: "#ffffff",
            padding: "40px",
            borderRadius: "12px",
            textAlign: "center",
            boxShadow:
              "0 2px 10px rgba(0,0,0,0.08)",
          }}
        >
          <h2>
            📦 No Applications Found
          </h2>

          <p
            style={{
              color: "#6b7280",
            }}
          >
            Try changing your search
            or filter options.
          </p>
        </div>
      ) : (
        filteredApplications.map(
          (application) => (
            <ApplicationCard
              key={application._id}
              application={application}
              onDelete={fetchApplications}
            />
          )
        )
      )}
    </div>
  );
}

export default Applications;