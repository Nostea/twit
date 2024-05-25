import { User } from "../../models/User.js";
import { createToken } from "../../utils/createToken.js";

export async function refreshAccessToken(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User doesn't exist !");

  const newAccessToken = createToken(user, "access");
  return newAccessToken;
}
