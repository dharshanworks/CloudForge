import {
  validateRepositoryService,
  getRepositoryDetailsService,
  getRepositoryBranchesService,
  getLatestCommitService,
  getCommitHistoryService,
} from "../services/github.service.js";

/*
===========================================
Validate Repository
===========================================
*/

export async function validateRepository(
  request,
  response
) {
  try {
    const result =
      await validateRepositoryService(
        request.body.repository
      );

    return response.status(200).json({
      success: true,
      message:
        "Repository validated successfully.",
      data: result,
    });
  } catch (error) {
    return response.status(400).json({
      success: false,
      message: error.message,
    });
  }
}

/*
===========================================
Repository Details
===========================================
*/

export async function getRepositoryDetails(
  request,
  response
) {
  try {
    const result =
      await getRepositoryDetailsService(
        request.query.repository
      );

    return response.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/*
===========================================
Repository Branches
===========================================
*/

export async function getRepositoryBranches(
  request,
  response
) {
  try {
    const result =
      await getRepositoryBranchesService(
        request.query.repository
      );

    return response.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/*
===========================================
Latest Commit
===========================================
*/

export async function getLatestCommit(
  request,
  response
) {
  try {
    const result =
      await getLatestCommitService(
        request.query.repository,
        request.query.branch
      );

    return response.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

/*
===========================================
Commit History
===========================================
*/

export async function getCommitHistory(
  request,
  response
) {
  try {
    const result =
      await getCommitHistoryService(
        request.query.repository,
        request.query.branch
      );

    return response.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    return response.status(500).json({
      success: false,
      message: error.message,
    });
  }
}