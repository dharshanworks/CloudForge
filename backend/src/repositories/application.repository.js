import Application from "../models/application.model.js";

/**
 * ===========================================
 * Create Application
 * ===========================================
 */
export async function createApplication(applicationData) {
  return await Application.create(applicationData);
}

/**
 * ===========================================
 * Find Application By ID
 * ===========================================
 */
export async function findApplicationById(applicationId) {
  return await Application.findById(applicationId)
    .populate("owner", "fullName email role")
    .populate("project", "name");
}

/**
 * ===========================================
 * Find Applications By Project
 * ===========================================
 */
export async function findApplicationsByProject(projectId) {
  return await Application.find({
    project: projectId,
  }).sort({
    createdAt: -1,
  });
}

/**
 * ===========================================
 * Find Applications By Owner
 * ===========================================
 */
export async function findApplicationsByOwner(ownerId) {
  return await Application.find({
    owner: ownerId,
  }).sort({
    createdAt: -1,
  });
}

/**
 * ===========================================
 * Find Application By Name + Project
 * ===========================================
 */
export async function findApplicationByNameAndProject(
  name,
  projectId
) {
  return await Application.findOne({
    name,
    project: projectId,
  });
}

/**
 * ===========================================
 * Update Application
 * ===========================================
 */
export async function updateApplication(
  applicationId,
  updateData
) {
  return await Application.findByIdAndUpdate(
    applicationId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * ===========================================
 * Delete Application
 * ===========================================
 */
export async function deleteApplication(applicationId) {
  return await Application.findByIdAndDelete(
    applicationId
  );
}