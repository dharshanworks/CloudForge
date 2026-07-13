import api from "./axios";

/**
 * Create Project
 */
export async function createProject(data) {
  const response = await api.post("/projects", data);
  return response.data;
}

/**
 * Get Projects
 */
export async function getProjects() {
  const response = await api.get("/projects");
  return response.data;
}

/**
 * Get Project
 */
export async function getProject(projectId) {
  const response = await api.get(`/projects/${projectId}`);
  return response.data;
}

/**
 * Update Project
 */
export async function updateProject(projectId, data) {
  const response = await api.put(`/projects/${projectId}`, data);
  return response.data;
}

/**
 * Delete / Archive Project
 */
export async function deleteProject(projectId) {
  const response = await api.delete(`/projects/${projectId}`);
  return response.data;
}