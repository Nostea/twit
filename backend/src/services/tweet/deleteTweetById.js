import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export async function deleteTweet(tweetId, authenticatedUserId) {
  // * Email Verified Check
  const user = await User.findOne({ _id: authenticatedUserId });
  if (!user?.isEmailVerified)
    throw new Error("Email not verified, you cannot add tweet");
  // * Email Verified Check

  const deletedTweet = await Tweet.findByIdAndDelete(tweetId);
  if (!deletedTweet) throw new Error("Tweet with this id doesn't exist!");
  return deletedTweet;
}
