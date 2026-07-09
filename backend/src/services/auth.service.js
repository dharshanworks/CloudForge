import bcrypt from "bcrypt";
import {
  findUserByEmail,
  findUserById,
} from "../repositories/user.repository.js";
import { generateAccessToken } from "../utils/jwt.js";

/**
 * Login User
 */
export async function loginUser(email, password) {
  // Find user by email
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error("Invalid email or password.");
  }

  // Check account status
  if (!user.isActive) {
    throw new Error("User account is inactive.");
  }

  // Compare password
  const passwordMatched = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatched) {
    throw new Error("Invalid email or password.");
  }

  // Generate JWT
  const accessToken = generateAccessToken({
    id: user._id,
    email: user.email,
    role: user.role,
  });

  // Return safe response
  return {
    accessToken,
    user: {
      id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      isActive: user.isActive,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    },
  };
}

/**
 * Get Currently Logged-in User
 */
export async function getCurrentUser(userId) {
  const user = await findUserById(userId);

  if (!user) {
    throw new Error("User not found.");
  }

  return {
    id: user._id,
    fullName: user.fullName,
    email: user.email,
    role: user.role,
    isActive: user.isActive,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
}