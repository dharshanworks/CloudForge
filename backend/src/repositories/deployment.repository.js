import Deployment from "../models/Deployment.js";

/**
 * ===========================================
 * Create Deployment
 * ===========================================
 */
export async function createDeployment(
  deploymentData
) {
  return await Deployment.create(
    deploymentData
  );
}

/**
 * ===========================================
 * Find Deployment By ID
 * ===========================================
 */
export async function findDeploymentById(
  deploymentId
) {
  return await Deployment.findById(
    deploymentId
  )
    .populate(
      "project",
      "name"
    )
    .populate(
      "application",
      "name runtime framework"
    )
    .populate(
      "owner",
      "fullName email role"
    );
}

/**
 * ===========================================
 * Get Deployments By Application
 * ===========================================
 */
export async function findDeploymentsByApplication(
  applicationId
) {
  return await Deployment.find({
    application: applicationId,
  }).sort({
    createdAt: -1,
  });
}

/**
 * ===========================================
 * Update Deployment
 * ===========================================
 */
export async function updateDeployment(
  deploymentId,
  updateData
) {
  return await Deployment.findByIdAndUpdate(
    deploymentId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * ===========================================
 * Delete Deployment
 * ===========================================
 */
export async function deleteDeployment(
  deploymentId
) {
  return await Deployment.findByIdAndDelete(
    deploymentId
  );
}