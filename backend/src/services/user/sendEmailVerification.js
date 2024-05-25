import { User } from "../../models/User.js";
import { sendEmail } from "../../utils/sendEmail.js";

export async function sendEmailVerification(authenticatedUserId) {
  const user = await User.findById(authenticatedUserId);

  // * Email Verified Check
  if (user?.isEmailVerified) throw new Error("Email already verified");
  // * Email Verified Check

  console.log(authenticatedUserId);
  console.log(user);
  return sendEmail({
    to: user.email,
    subject: "Welcome to TwitterClone",
    text: `Hi ${user.username},
      Welcome to TwitterClone 🎉!!!
      Please verify your Account to be able to tweet!
      This is your six digit code: ${user.sixDigitCode}!
      `,
  });
}
