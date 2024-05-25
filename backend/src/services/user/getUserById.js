import { User } from "../../models/User.js";

export async function getUserById(userId) {
  console.log(userId);
  const foundUser = await User.findById(userId);

  if (!foundUser) {
    throw new Error("user can't be loaded");
  }
  return foundUser;
}
