import { useEffect, useState } from "react";

import { getApplications } from "../api/application.api";

export function useApplications(projectId) {
  // ============================
  // State
  // ============================

  const [applications, setApplications] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  // ============================
  // Fetch Applications
  // ============================

  async function fetchApplications() {
    try {
      setLoading(true);

      const response = await getApplications(projectId);

      setApplications(response.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
        "Unable to fetch applications."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Load Once
  // ============================

  useEffect(() => {
    if (projectId) {
      fetchApplications();
    }
  }, [projectId]);

  // ============================
  // Return
  // ============================

  return {
    applications,
    loading,
    error,
    fetchApplications,
  };
}