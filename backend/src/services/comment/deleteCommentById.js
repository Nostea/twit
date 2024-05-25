import { Comment } from "../../models/Comment.js";
import { User } from "../../models/User.js";

export async function deleteComment(commentId, authenticatedUserId) {
  // * Email Verified Check
  const user = await User.findOne({ _id: authenticatedUserId });
  if (!user?.isEmailVerified)
    throw new Error("Email not verified, you cannot delete comment");
  // * Email Verified Check

  const deletedComment = await Comment.findByIdAndDelete(commentId);
  if (!deletedComment) throw new Error("Comment with this id doesn't exist!");
  return deletedComment;
}
