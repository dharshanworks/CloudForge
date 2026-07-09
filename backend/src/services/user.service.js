import bcrypt from "bcrypt";
import {
  createUser,
  findUserByEmail,
} from "../repositories/user.repository.js";

const SALT_ROUNDS = 10;

export async function registerUser(userData) {
  const existingUser = await findUserByEmail(userData.email);

  if (existingUser) {
    throw new Error("Email is already registered.");
  }

  const hashedPassword = await bcrypt.hash(
    userData.password,
    SALT_ROUNDS
  );

  const newUser = await createUser({
    ...userData,
    password: hashedPassword,
  });

  return newUser;
}