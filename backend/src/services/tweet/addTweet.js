import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export async function addTweet(tweetInfo, authenticatedUserId) {
  // * Email Verified Check
  const user = await User.findOne({ _id: authenticatedUserId });
  if (!user?.isEmailVerified) throw new Error("Email not verified, you cannot add tweet");
  // * Email Verified Check

  const newTweet = await Tweet.create({
    ...tweetInfo,
    userId: authenticatedUserId,
    username: user.username,
    profileImg: user.profileImg,
    // authenticatedUserId kann nur vom token kommen, deshalb sicherer (authenticatedUserId überschreibt die userId, die bei tweetInfo mitgeschickt wird)
  });
  return newTweet;
}
