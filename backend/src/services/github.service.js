import {
  getRepository,
  getBranches,
  getLatestCommit,
  getCommits,
} from "../utils/githubClient.js";

/**
 * ==================================================
 * GitHub Service
 * ==================================================
 * Handles all GitHub-related business logic.
 * ==================================================
 */

/**
 * ===========================================
 * Validate Repository
 * ===========================================
 */

export async function validateRepositoryService(
  repositoryUrl
) {
  if (!repositoryUrl) {
    throw new Error(
      "Repository URL is required."
    );
  }

  const repository =
    await getRepository(
      repositoryUrl
    );

  return {
    valid: true,
    repository: repository.name,
    owner: repository.owner.login,
    defaultBranch:
      repository.default_branch,
    visibility:
      repository.private
        ? "PRIVATE"
        : "PUBLIC",
  };
}

/**
 * ===========================================
 * Repository Details
 * ===========================================
 */

export async function getRepositoryDetailsService(
  repositoryUrl
) {
  if (!repositoryUrl) {
    throw new Error(
      "Repository URL is required."
    );
  }

  const repository =
    await getRepository(
      repositoryUrl
    );

  return {
    id: repository.id,

    name: repository.name,

    fullName:
      repository.full_name,

    owner:
      repository.owner.login,

    description:
      repository.description,

    defaultBranch:
      repository.default_branch,

    language:
      repository.language,

    visibility:
      repository.private
        ? "PRIVATE"
        : "PUBLIC",

    stars:
      repository.stargazers_count,

    forks:
      repository.forks_count,

    openIssues:
      repository.open_issues_count,

    cloneUrl:
      repository.clone_url,

    htmlUrl:
      repository.html_url,

    createdAt:
      repository.created_at,

    updatedAt:
      repository.updated_at,

    pushedAt:
      repository.pushed_at,
  };
}

/**
 * ===========================================
 * Repository Branches
 * ===========================================
 */

export async function getRepositoryBranchesService(
  repositoryUrl
) {
  if (!repositoryUrl) {
    throw new Error(
      "Repository URL is required."
    );
  }

  const branches =
    await getBranches(
      repositoryUrl
    );

  return branches.map(
    (branch) => ({
      name: branch.name,

      protected:
        branch.protected,

      commit:
        branch.commit.sha,
    })
  );
}

/**
 * ===========================================
 * Latest Commit
 * ===========================================
 */

export async function getLatestCommitService(
  repositoryUrl,
  branch = "main"
) {
  if (!repositoryUrl) {
    throw new Error(
      "Repository URL is required."
    );
  }

  const commit =
    await getLatestCommit(
      repositoryUrl,
      branch
    );

  if (!commit) {
    return null;
  }

  return {
    sha: commit.sha,

    author:
      commit.commit.author.name,

    email:
      commit.commit.author.email,

    message:
      commit.commit.message,

    date:
      commit.commit.author.date,

    url:
      commit.html_url,
  };
}

/**
 * ===========================================
 * Commit History
 * ===========================================
 */

export async function getCommitHistoryService(
  repositoryUrl,
  branch = "main"
) {
  if (!repositoryUrl) {
    throw new Error(
      "Repository URL is required."
    );
  }

  const commits =
    await getCommits(
      repositoryUrl,
      branch
    );

  return commits.map(
    (commit) => ({
      sha: commit.sha,

      author:
        commit.commit.author.name,

      message:
        commit.commit.message,

      date:
        commit.commit.author.date,

      url:
        commit.html_url,
    })
  );
}