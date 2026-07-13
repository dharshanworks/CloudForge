import {
  createNewProject,
  getMyProjects,
  getProject,
  editProject,
  archiveExistingProject,
} from "../services/project.service.js";

import { successResponse } from "../utils/apiResponse.js";

/**
 * Create Project
 */
export async function createProject(request, response, next) {
  try {
    const project = await createNewProject(
      request.body,
      request.user.id
    );

    return response.status(201).json(
      successResponse(
        "Project created successfully.",
        project
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get My Projects
 */
export async function getProjects(request, response, next) {
  try {
    const projects = await getMyProjects(request.user.id);

    return response.status(200).json(
      successResponse(
        "Projects fetched successfully.",
        projects
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Get Single Project
 */
export async function getProjectById(request, response, next) {
  try {
    const project = await getProject(
      request.params.projectId
    );

    return response.status(200).json(
      successResponse(
        "Project fetched successfully.",
        project
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Update Project
 */
export async function updateProjectController(
  request,
  response,
  next
) {
  try {
    const project = await editProject(
      request.params.projectId,
      request.user.id,
      request.body
    );

    return response.status(200).json(
      successResponse(
        "Project updated successfully.",
        project
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Archive Project
 */
export async function archiveProjectController(
  request,
  response,
  next
) {
  try {
    const project =
      await archiveExistingProject(
        request.params.projectId,
        request.user.id
      );

    return response.status(200).json(
      successResponse(
        "Project archived successfully.",
        project
      )
    );
  } catch (error) {
    next(error);
  }
}