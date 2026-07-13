import {
  createNewDeployment,
  getDeployments,
  getDeployment,
  editDeployment,
  deleteExistingDeployment,
} from "../services/deployment.service.js";

import { successResponse } from "../utils/apiResponse.js";

/**
 * ===========================================
 * Create Deployment
 * ===========================================
 */
export async function createDeployment(
  request,
  response,
  next
) {
  try {
    const deployment =
      await createNewDeployment(
        request.body,
        request.user.id
      );

    return response.status(201).json(
      successResponse(
        "Deployment created successfully.",
        deployment
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Get Deployments By Application
 * ===========================================
 */
export async function getApplicationDeployments(
  request,
  response,
  next
) {
  try {
    const deployments =
      await getDeployments(
        request.params.applicationId
      );

    return response.status(200).json(
      successResponse(
        "Deployments fetched successfully.",
        deployments
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Get Deployment By ID
 * ===========================================
 */
export async function getDeploymentById(
  request,
  response,
  next
) {
  try {
    const deployment =
      await getDeployment(
        request.params.deploymentId
      );

    return response.status(200).json(
      successResponse(
        "Deployment fetched successfully.",
        deployment
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Update Deployment
 * ===========================================
 */
export async function updateDeploymentController(
  request,
  response,
  next
) {
  try {
    const deployment =
      await editDeployment(
        request.params.deploymentId,
        request.user.id,
        request.body
      );

    return response.status(200).json(
      successResponse(
        "Deployment updated successfully.",
        deployment
      )
    );
  } catch (error) {
    next(error);
  }
}

/**
 * ===========================================
 * Delete Deployment
 * ===========================================
 */
export async function deleteDeploymentController(
  request,
  response,
  next
) {
  try {
    const result =
      await deleteExistingDeployment(
        request.params.deploymentId,
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