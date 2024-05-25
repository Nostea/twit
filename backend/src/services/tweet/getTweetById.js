import { Tweet } from "../../models/Tweet.js";

export async function getTweetById(tweetId) {
  console.log(tweetId);
  const foundTweet = await Tweet.findById(tweetId);

  if (!foundTweet) {
    throw new Error("Tweet can't be loaded");
  }
  return foundTweet;
}
