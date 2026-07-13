import api from "./axios";

/**
 * Create Application
 */
export async function createApplication(applicationData) {
  const response = await api.post(
    "/applications",
    applicationData
  );

  return response.data;
}

/**
 * Get Applications By Project
 */
export async function getApplications(projectId) {
  const response = await api.get(
    `/applications/project/${projectId}`
  );

  return response.data;
}

/**
 * Get Application Details
 */
export async function getApplication(applicationId) {
  const response = await api.get(
    `/applications/${applicationId}`
  );

  return response.data;
}

/**
 * Update Application
 */
export async function updateApplication(
  applicationId,
  applicationData
) {
  const response = await api.put(
    `/applications/${applicationId}`,
    applicationData
  );

  return response.data;
}

/**
 * Delete Application
 */
export async function deleteApplication(applicationId) {
  const response = await api.delete(
    `/applications/${applicationId}`
  );

  return response.data;
}