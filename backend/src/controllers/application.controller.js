import {
  createNewApplication,
  getApplicationsByProject,
  getApplication,
  editApplication,
  deleteExistingApplication,
} from "../services/application.service.js";

import { successResponse } from "../utils/apiResponse.js";

/**
 * ===========================================
 * Create Application
 * ===========================================
 */
export async function createApplication(
  request,
  response,
  next
) {
  try {
    const application =
      await createNewApplication(
        request.body,
        request.user.id
      );

    return response.status(201).json(
      successResponse(
        "Application created successfully.",
        application
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Get Applications By Project
 * ===========================================
 */
export async function getProjectApplications(
  request,
  response,
  next
) {
  try {
    const applications =
      await getApplicationsByProject(
        request.params.projectId
      );

    return response.status(200).json(
      successResponse(
        "Applications fetched successfully.",
        applications
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Get Application By ID
 * ===========================================
 */
export async function getApplicationById(
  request,
  response,
  next
) {
  try {
    const application =
      await getApplication(
        request.params.applicationId
      );

    return response.status(200).json(
      successResponse(
        "Application fetched successfully.",
        application
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Update Application
 * ===========================================
 */
export async function updateApplicationController(
  request,
  response,
  next
) {
  try {
    const application =
      await editApplication(
        request.params.applicationId,
        request.user.id,
        request.body
      );

    return response.status(200).json(
      successResponse(
        "Application updated successfully.",
        application
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Delete Application
 * ===========================================
 */
export async function deleteApplicationController(
  request,
  response,
  next
) {
  try {
    const result =
      await deleteExistingApplication(
        request.params.applicationId,
        request.user.id
      );

    return response.status(200).json(
      successResponse(
        result.message,
        null
      )
    );
  } catch (error) {
    next(error);
  }
}