import { TweetService } from "../services/indexService.js";

async function getAllTweetsCtrl(req, res) {
  const userId = req.query.userId; //als query parameter, hier kommt man nur mit .query ran
  TweetService.getAllTweets(userId)
    .then((tweets) => res.json(tweets))
    .catch((err) => {
      res.status(500).json({ err, message: "Could not GET all tweets" });
    });
}

async function getTweetByIdCtrl(req, res) {
  try {
    const tweetId = req.params.tweetId; // wir kriegen path variable raus (siehe postman)
    const result = await TweetService.getTweetById(tweetId);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "could not find tweet" + tweetId });
  }
}

async function addTweetCtrl(req, res) {
  try {
    const tweetInfo = req.body;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await TweetService.addTweet(tweetInfo, authenticatedUserId);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add Tweet" });
  }
}

async function deleteTweetCtrl(req, res) {
  try {
    const tweetId = req.params.tweetId;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await TweetService.deleteTweet(tweetId, authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not delete tweet" });
  }
}

export const TweetController = {
  getAllTweetsCtrl,
  getTweetByIdCtrl,
  addTweetCtrl,
  deleteTweetCtrl,
};
