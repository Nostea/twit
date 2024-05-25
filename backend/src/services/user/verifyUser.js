import { User } from "../../models/User.js";

export async function verifyUser(sixDigitCode, authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);
  if (!user) throw new Error("User not found");

  const codeMatched = user.sixDigitCode === sixDigitCode;
  if (!codeMatched) throw new Error("Invalid six digit code");

  user.isEmailVerified = true;
  await user.save();

  return { message: "Your email is verified!" };
}
