import express from "express";
import { TweetController } from "../controller/tweetController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const tweetRouter = express
  .Router()
  .get("/feed", doJwtAuth, TweetController.getAllTweetsCtrl)
  .get("/:tweetId", doJwtAuth, TweetController.getTweetByIdCtrl)
  .post("/", doJwtAuth, TweetController.addTweetCtrl)
  .delete("/:tweetId", doJwtAuth, TweetController.deleteTweetCtrl);
