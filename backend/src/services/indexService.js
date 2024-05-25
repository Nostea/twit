import { addComment } from "./comment/addCommentById.js";
import { deleteComment } from "./comment/deleteCommentById.js";
import { addTweet } from "./tweet/addTweet.js";
import { deleteTweet } from "./tweet/deleteTweetById.js";
import { getTweetById } from "./tweet/getTweetById.js";
import { getAllTweets } from "./tweet/getTweetFeed.js";
import { getUserById } from "./user/getUserById.js";
import { loginUser } from "./user/loginUser.js";
import { registerUser } from "./user/registerUser.js";
import { verifyUser } from "./user/verifyUser.js";
import { sendEmailVerification } from "./user/sendEmailVerification.js";
import { editFollowing } from "./user/editFollowingToggle.js";
import { refreshAccessToken } from "./user/refreshToken.js";

export const UserService = {
  getUserById,
  registerUser,
  loginUser,
  sendEmailVerification,
  verifyUser,
  editFollowing,
  refreshAccessToken,
};

export const TweetService = {
  getTweetById,
  getAllTweets,
  addTweet,
  deleteTweet,
};

export const CommentService = {
  addComment,
  deleteComment,
};
