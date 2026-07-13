import {
  createApplication,
  findApplicationById,
  findApplicationsByProject,
  findApplicationByNameAndProject,
  updateApplication,
  deleteApplication,
} from "../repositories/application.repository.js";

import { findProjectById } from "../repositories/project.repository.js";

/**
 * ===========================================
 * Create Application
 * ===========================================
 */
export async function createNewApplication(
  applicationData,
  ownerId
) {
  // Check whether project exists
  const project = await findProjectById(
    applicationData.project
  );

  if (!project) {
    throw new Error("Project not found.");
  }

  // Check ownership
  if (project.owner._id.toString() !== ownerId) {
    throw new Error(
      "You are not authorized to create applications in this project."
    );
  }

  // Normalize application name
  const applicationName =
    applicationData.name.trim();

  // Check duplicate application
  const duplicate =
    await findApplicationByNameAndProject(
      applicationName,
      applicationData.project
    );

  if (duplicate) {
    throw new Error(
      "An application with this name already exists in this project."
    );
  }

  // Create application
  const application =
    await createApplication({
      ...applicationData,
      name: applicationName,
      owner: ownerId,
    });

  // Return only required fields
  return {
    id: application._id,
    name: application.name,
    description: application.description,
    project: application.project,
    repository: application.repository,
    branch: application.branch,
    runtime: application.runtime,
    framework: application.framework,
    dockerImage: application.dockerImage,
    status: application.status,
    owner: application.owner,
    createdAt: application.createdAt,
    updatedAt: application.updatedAt,
  };
}

/**
 * ===========================================
 * Get Applications By Project
 * ===========================================
 */
export async function getApplicationsByProject(
  projectId
) {
  return await findApplicationsByProject(
    projectId
  );
}

/**
 * ===========================================
 * Get Single Application
 * ===========================================
 */
export async function getApplication(
  applicationId
) {
  const application =
    await findApplicationById(applicationId);

  if (!application) {
    throw new Error("Application not found.");
  }

  return application;
}

/**
 * ===========================================
 * Update Application
 * ===========================================
 */
export async function editApplication(
  applicationId,
  ownerId,
  updateData
) {
  const application =
    await findApplicationById(applicationId);

  if (!application) {
    throw new Error("Application not found.");
  }

  if (
    application.owner._id.toString() !== ownerId
  ) {
    throw new Error(
      "You are not authorized to update this application."
    );
  }

  const updatedApplication =
    await updateApplication(
      applicationId,
      updateData
    );

  return updatedApplication;
}

/**
 * ===========================================
 * Delete Application
 * ===========================================
 */
export async function deleteExistingApplication(
  applicationId,
  ownerId
) {
  const application =
    await findApplicationById(applicationId);

  if (!application) {
    throw new Error("Application not found.");
  }

  if (
    application.owner._id.toString() !== ownerId
  ) {
    throw new Error(
      "You are not authorized to delete this application."
    );
  }

  await deleteApplication(applicationId);

  return {
    success: true,
    message:
      "Application deleted successfully.",
  };
}