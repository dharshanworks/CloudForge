import {
  createDeployment,
  findDeploymentById,
  findDeploymentsByApplication,
  updateDeployment,
  deleteDeployment,
} from "../repositories/deployment.repository.js";

import { findApplicationById } from "../repositories/application.repository.js";

/**
 * ===========================================
 * Create Deployment
 * ===========================================
 */
export async function createNewDeployment(
  deploymentData,
  ownerId
) {
  // Check application exists
  const application =
    await findApplicationById(
      deploymentData.application
    );

  if (!application) {
    throw new Error(
      "Application not found."
    );
  }

  // Check ownership
  if (
    application.owner._id.toString() !==
    ownerId
  ) {
    throw new Error(
      "You are not authorized to deploy this application."
    );
  }

  // Create Deployment
  const deployment =
    await createDeployment({
      ...deploymentData,
      owner: ownerId,
      project:
        application.project._id ||
        application.project,
    });

  return deployment;
}

/**
 * ===========================================
 * Get Deployments
 * ===========================================
 */
export async function getDeployments(
  applicationId
) {
  return await findDeploymentsByApplication(
    applicationId
  );
}

/**
 * ===========================================
 * Get Deployment
 * ===========================================
 */
export async function getDeployment(
  deploymentId
) {
  const deployment =
    await findDeploymentById(
      deploymentId
    );

  if (!deployment) {
    throw new Error(
      "Deployment not found."
    );
  }

  return deployment;
}

/**
 * ===========================================
 * Update Deployment
 * ===========================================
 */
export async function editDeployment(
  deploymentId,
  ownerId,
  updateData
) {
  const deployment =
    await findDeploymentById(
      deploymentId
    );

  if (!deployment) {
    throw new Error(
      "Deployment not found."
    );
  }

  if (
    deployment.owner._id.toString() !==
    ownerId
  ) {
    throw new Error(
      "You are not authorized to update this deployment."
    );
  }

  return await updateDeployment(
    deploymentId,
    updateData
  );
}

/**
 * ===========================================
 * Delete Deployment
 * ===========================================
 */
export async function deleteExistingDeployment(
  deploymentId,
  ownerId
) {
  const deployment =
    await findDeploymentById(
      deploymentId
    );

  if (!deployment) {
    throw new Error(
      "Deployment not found."
    );
  }

  if (
    deployment.owner._id.toString() !==
    ownerId
  ) {
    throw new Error(
      "You are not authorized to delete this deployment."
    );
  }

  await deleteDeployment(
    deploymentId
  );

  return {
    message:
      "Deployment deleted successfully.",
  };
}