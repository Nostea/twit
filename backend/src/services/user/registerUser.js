import { User } from "../../models/User.js";
import { generateRandomSixDigitCode } from "../../utils/sixDigitCode.js";
import { generateRandomSalt, hash } from "../../utils/hash.js";
import { userToView } from "../helpers.js";

export async function registerUser({ username, bio, email, profileImg, following, follower, password }) {
  const foundUserWithEmail = await User.findOne({ email });
  if (foundUserWithEmail) throw new Error("User with this email already has an account");

  const passwordSalt = generateRandomSalt();
  const passwordHash = hash(`${password}${passwordSalt}`);

  const sixDigitCode = generateRandomSixDigitCode();

  const user = await User.create({
    username,
    bio,
    email,
    profileImg,
    following,
    follower,
    passwordHash,
    passwordSalt,
    sixDigitCode,
  });

  return userToView(user);
}
