import { Comment } from "../../models/Comment.js";
import { User } from "../../models/User.js";

export async function getCommentsByTweet(tweetId, authenticatedUserId) {
    // * Email Verified Check
    const user = await User.findOne({ _id: authenticatedUserId });
    if (!user?.isEmailVerified)
      throw new Error("Email not verified, you cannot add comment");
    // * Email Verified Check
  
    const commentsByTweetId = Comment.find({ tweetId: tweetId})

    return commentsByTweetId;
  }