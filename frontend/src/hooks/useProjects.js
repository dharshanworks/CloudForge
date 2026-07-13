import { useEffect, useState } from "react";

import { getProjects } from "../api/project.api";

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function fetchProjects() {
    try {
      setLoading(true);
      setError("");

      const response = await getProjects();

      console.log("Projects API Response:", response);
      console.log("Projects Array:", response.data);

      // response = {
      //   success: true,
      //   message: "...",
      //   data: [...]
      // }

      if (
        response &&
        response.success &&
        Array.isArray(response.data)
      ) {
        setProjects(response.data);
      } else {
        console.error("Unexpected API Response:", response);
        setProjects([]);
        setError("Invalid response received from server.");
      }
    } catch (error) {
      console.error("Failed to fetch projects:", error);

      setProjects([]);

      setError(
        error.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProjects();
  }, []);

  return {
    projects,
    loading,
    error,
    refreshProjects: fetchProjects,
  };
}