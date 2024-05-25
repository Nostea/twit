import { Tweet } from "../../models/Tweet.js";
import { User } from "../../models/User.js";

export async function getAllTweets(userId) {
  const foundUser = await User.findById(userId);
  if (!foundUser) {
    throw new Error("user not found");
  }

  // Array von Tweets von dem hauptnutzer
  const foundTweets = await Tweet.find({ userId: userId }); //! hier muss query nach sich selber + allen followern kommen
  if (!foundTweets) {
    console.warn("0 tweets vom hauptuser");
  }
  // Array aus den Tweets von allen, denen man folgt (following)
  const foundTweetFollowers = await Tweet.find({ userId: foundUser.following }); // query Match an Array //

  //* momentan wird das program abgebrochen weil bei 0 Leuten die man followed ein error gethrowd wird
  if (!foundTweetFollowers) {
    console.warn("0 Follower, es werden keine Tweets von followern geladen");
  }

  //! wir wollen die 2 arrays zusammenfügen
  const combinedTweetsArray = [];

  const transformedUserTweets = [];

 //* transformieren

  combinedTweetsArray.push(...foundTweets);
  combinedTweetsArray.push(...foundTweetFollowers);

  return combinedTweetsArray;
}
