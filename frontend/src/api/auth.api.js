import api from "./axios";

/**
 * Login
 */
export async function loginUser(credentials) {
  const response = await api.post(
    "/auth/login",
    credentials
  );

  return response.data;
}

/**
 * Get Current User
 */
export async function getCurrentUser() {
  const response = await api.get("/auth/me");

  return response.data;
}