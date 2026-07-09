import User from "../models/User.js";

/**
 * Create a new user
 */
export async function createUser(userData) {
  return await User.create(userData);
}

/**
 * Find user by email
 */
export async function findUserByEmail(email) {
  return await User.findOne({ email });
}

/**
 * Find user by ID
 */
export async function findUserById(id) {
  return await User.findById(id);
}

/**
 * Get all users
 */
export async function getAllUsers() {
  return await User.find();
}