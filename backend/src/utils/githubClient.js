import githubConfig from "../config/github.config.js";

/**
 * ==================================================
 * GitHub REST Client
 * ==================================================
 */

const GITHUB_API =
  githubConfig.apiUrl;

/**
 * ===========================================
 * Parse Repository URL
 * ===========================================
 */

function parseRepository(
  repositoryUrl
) {
  try {
    const url = new URL(
      repositoryUrl
    );

    const parts =
      url.pathname
        .replace(/^\/|\/$/g, "")
        .split("/");

    if (parts.length < 2) {
      throw new Error(
        "Invalid GitHub repository URL."
      );
    }

    return {
      owner: parts[0],

      repository:
        parts[1].replace(
          ".git",
          ""
        ),
    };
  } catch {
    throw new Error(
      "Invalid GitHub repository URL."
    );
  }
}

/**
 * ===========================================
 * GitHub Request
 * ===========================================
 */

async function githubRequest(
  endpoint
) {
  const headers = {
    Accept:
      "application/vnd.github+json",

    "User-Agent":
      githubConfig.userAgent,
  };

  if (
    githubConfig.token &&
    githubConfig.token.trim() !== ""
  ) {
    headers.Authorization =
      `Bearer ${githubConfig.token}`;
  }

  const response =
    await fetch(
      `${GITHUB_API}${endpoint}`,
      {
        method: "GET",
        headers,
      }
    );

  if (!response.ok) {
    let message =
      "GitHub API request failed.";

    try {
      const error =
        await response.json();

      message =
        error.message || message;
    } catch {
      // Ignore parsing error
    }

    throw new Error(message);
  }

  return response.json();
}

/**
 * ===========================================
 * Repository
 * ===========================================
 */

export async function getRepository(
  repositoryUrl
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}`
  );
}

/**
 * ===========================================
 * Repository Branches
 * ===========================================
 */

export async function getBranches(
  repositoryUrl
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}/branches`
  );
}

/**
 * ===========================================
 * Latest Commit
 * ===========================================
 */

export async function getLatestCommit(
  repositoryUrl,
  branch = "main"
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  const commits =
    await githubRequest(
      `/repos/${owner}/${repository}/commits?sha=${branch}&per_page=1`
    );

  return commits.length > 0
    ? commits[0]
    : null;
}

/**
 * ===========================================
 * Commit History
 * ===========================================
 */

export async function getCommits(
  repositoryUrl,
  branch = "main"
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}/commits?sha=${branch}&per_page=20`
  );
}

/**
 * ===========================================
 * Repository Languages
 * ===========================================
 */

export async function getLanguages(
  repositoryUrl
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}/languages`
  );
}

/**
 * ===========================================
 * Repository Contributors
 * ===========================================
 */

export async function getContributors(
  repositoryUrl
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}/contributors`
  );
}

/**
 * ===========================================
 * Repository Releases
 * ===========================================
 */

export async function getReleases(
  repositoryUrl
) {
  const {
    owner,
    repository,
  } = parseRepository(
    repositoryUrl
  );

  return await githubRequest(
    `/repos/${owner}/${repository}/releases`
  );
}