import express from "express";
import { UserController } from "../controller/userController.js";
import { doJwtAuth, validateRefreshToken } from "../middlewares/doJwtAuth.js";

export const userRouter = express
  .Router()
  .post("/register", UserController.postRegisterUserCtrl)
  .post("/login", UserController.postLoginUserCtrl)
  .post("/sendVerificationEmail", doJwtAuth, UserController.postSendEmailVerificationCtrl)
  .post("/verifyEmail", doJwtAuth, UserController.postVerifyUserEmailCtrl)
  .post("/refreshtoken", validateRefreshToken, UserController.postRefreshTokenCtrl)
  .get("/:userId", doJwtAuth, UserController.getUserByIdCtrl)
  .post("/followToggle/:userId", doJwtAuth, UserController.patchFollowToggleCtrl);
