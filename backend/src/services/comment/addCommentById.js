import { Comment } from "../../models/Comment.js";
import { User } from "../../models/User.js";

export async function addComment(commentInfo, authenticatedUserId) {
  // * Email Verified Check
  const user = await User.findOne({ _id: authenticatedUserId });
  if (!user?.isEmailVerified)
    throw new Error("Email not verified, you cannot add comment");
  // * Email Verified Check

  const newComment = await Comment.create({
    ...commentInfo,
    authenticatedUserId,
  });
  return newComment;
}
