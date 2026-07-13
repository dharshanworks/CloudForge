import { useEffect, useState } from "react";

import {
  getApplicationPipelines,
  getPipeline,
} from "../api/pipeline.api";

function usePipelines({
  applicationId = null,
  pipelineId = null,
} = {}) {
  const [pipelines, setPipelines] =
    useState([]);

  const [pipeline, setPipeline] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ===========================================
  // Fetch All Pipelines
  // ===========================================

  async function fetchPipelines() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getApplicationPipelines(
          applicationId
        );

      setPipelines(
        response.data || []
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load pipelines."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===========================================
  // Fetch Single Pipeline
  // ===========================================

  async function fetchPipeline() {
    try {
      setLoading(true);
      setError("");

      const response =
        await getPipeline(
          pipelineId
        );

      setPipeline(
        response.data
      );
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to load pipeline."
      );
    } finally {
      setLoading(false);
    }
  }

  // ===========================================
  // Auto Load
  // ===========================================

  useEffect(() => {
    if (applicationId) {
      fetchPipelines();
    }
  }, [applicationId]);

  useEffect(() => {
    if (pipelineId) {
      fetchPipeline();
    }
  }, [pipelineId]);

  return {
    pipelines,
    pipeline,
    loading,
    error,
    fetchPipelines,
    fetchPipeline,
  };
}

export default usePipelines;