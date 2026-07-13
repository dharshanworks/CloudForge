import {
  createProject,
  findProjectsByOwner,
  findProjectById,
  updateProject,
  archiveProject,
} from "../repositories/project.repository.js";

/**
 * Create Project
 */
export async function createNewProject(projectData, ownerId) {
  // Check duplicate project name for this owner
  const existingProjects = await findProjectsByOwner(ownerId);

  const duplicate = existingProjects.find(
    (project) =>
      project.name.trim().toLowerCase() ===
      projectData.name.trim().toLowerCase()
  );

  if (duplicate) {
    throw new Error("A project with this name already exists.");
  }

  const project = await createProject({
    ...projectData,
    owner: ownerId,
  });

  return {
    id: project._id,
    name: project.name,
    description: project.description,
    gitRepository: project.gitRepository,
    cloudProvider: project.cloudProvider,
    environment: project.environment,
    visibility: project.visibility,
    status: project.status,
    createdAt: project.createdAt,
  };
}

/**
 * Get My Projects
 */
export async function getMyProjects(ownerId) {
  return await findProjectsByOwner(ownerId);
}

/**
 * Get Single Project
 */
export async function getProject(projectId) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  return project;
}

/**
 * Update Project
 */
export async function editProject(
  projectId,
  ownerId,
  updateData
) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  if (project.owner._id.toString() !== ownerId) {
    throw new Error("You are not authorized to update this project.");
  }

  return await updateProject(projectId, updateData);
}

/**
 * Archive Project
 */
export async function archiveExistingProject(
  projectId,
  ownerId
) {
  const project = await findProjectById(projectId);

  if (!project) {
    throw new Error("Project not found.");
  }

  if (project.owner._id.toString() !== ownerId) {
    throw new Error("You are not authorized to archive this project.");
  }

  return await archiveProject(projectId);
}