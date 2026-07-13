import dotenv from "dotenv";

dotenv.config();

const githubConfig = {
  apiUrl:
    process.env.GITHUB_API_URL ||
    "https://api.github.com",

  token:
    process.env.GITHUB_TOKEN || "",

  userAgent:
    "CloudForge",

  requestTimeout: 15000,
};

export default githubConfig;