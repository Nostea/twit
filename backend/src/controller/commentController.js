import { CommentService } from "../services/indexService.js";


async function getCommentsByTweetCtrl(req, res) {
  try {
    const tweetIdFromRequest = req.query?.tweetId;
    const authenticatedUserId = req.authenticatedUserId;
    const commentsByTweetResult = await CommentService.getCommentsByTweet(
      tweetIdFromRequest,
      authenticatedUserId
    )
    res.status(200).json({ result: commentsByTweetResult });
  } catch (err) {
    console.log(err)    
    res
    .status(500)
    .json({ err, message: err.message || "Could not get comments by tweet" });
  }
}

async function addCommentCtrl(req, res) {
  try {
    const commentInfo = req.body;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await CommentService.addComment(
      commentInfo,
      authenticatedUserId
    );
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not add comment" });
  }
}

async function deleteCommentCtrl(req, res) {
  try {
    const commentId = req.params.commentId;
    const authenticatedUserId = req.authenticatedUserId;
    const result = await CommentService.deleteComment(
      commentId,
      authenticatedUserId
    );
    res.json({ result });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ err, message: err.message || "Could not delete comment" });
  }
}

export const CommentController = {
  getCommentsByTweetCtrl,
  addCommentCtrl,
  deleteCommentCtrl,
};
