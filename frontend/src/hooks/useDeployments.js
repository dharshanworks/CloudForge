import { useEffect, useState } from "react";

import {
  getDeployments,
  deleteDeployment,
} from "../api/deployment.api";

export default function useDeployments(
  applicationId
) {
  const [deployments, setDeployments] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // ============================
  // Fetch Deployments
  // ============================

  async function fetchDeployments() {
    try {
      setLoading(true);

      const response =
        await getDeployments(
          applicationId
        );

      setDeployments(
        response.data
      );

      setError("");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to fetch deployments."
      );
    } finally {
      setLoading(false);
    }
  }

  // ============================
  // Delete Deployment
  // ============================

  async function removeDeployment(
    deploymentId
  ) {
    try {
      await deleteDeployment(
        deploymentId
      );

      await fetchDeployments();
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    if (applicationId) {
      fetchDeployments();
    }
  }, [applicationId]);

  return {
    deployments,
    loading,
    error,
    fetchDeployments,
    removeDeployment,
  };
}