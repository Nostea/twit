import express from "express";
import { CommentController } from "../controller/commentController.js";
import { doJwtAuth } from "../middlewares/doJwtAuth.js";

export const commentRouter = express
  .Router()
  .post("/", doJwtAuth, CommentController.addCommentCtrl)
  .delete("/:commentId", doJwtAuth, CommentController.deleteCommentCtrl);
