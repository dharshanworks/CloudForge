import { useEffect, useState } from "react";

import {
  getPipelineExecutions,
} from "../api/pipelineExecution.api";

function useExecutions(
  pipelineId
) {
  const [executions, setExecutions] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  /**
   * ===========================================
   * Fetch Executions
   * ===========================================
   */

  async function fetchExecutions() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getPipelineExecutions(
          pipelineId
        );

      setExecutions(
        response.data || []
      );
    } catch (error) {
      setError(
        error.response?.data
          ?.message ||
          "Unable to load executions."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (pipelineId) {
      fetchExecutions();
    }
  }, [pipelineId]);

  return {
    executions,
    loading,
    error,
    fetchExecutions,
  };
}

export default useExecutions;