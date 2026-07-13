import Project from "../models/Project.js";

/**
 * Create a new project
 */
export async function createProject(projectData) {
  return await Project.create(projectData);
}

/**
 * Find project by ID
 */
export async function findProjectById(projectId) {
  return await Project.findById(projectId).populate(
    "owner",
    "fullName email role"
  );
}

/**
 * Get all active projects owned by a user
 */
export async function findProjectsByOwner(ownerId) {
  return await Project.find({
    owner: ownerId,
    status: "ACTIVE",
  }).sort({
    createdAt: -1,
  });
}

/**
 * Update project
 */
export async function updateProject(
  projectId,
  updateData
) {
  return await Project.findByIdAndUpdate(
    projectId,
    updateData,
    {
      new: true,
      runValidators: true,
    }
  );
}

/**
 * Archive project
 */
export async function archiveProject(projectId) {
  return await Project.findByIdAndUpdate(
    projectId,
    {
      status: "ARCHIVED",
    },
    {
      new: true,
    }
  );
}