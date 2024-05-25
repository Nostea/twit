import { UserService } from "../services/indexService.js";

async function getUserByIdCtrl(req, res) {
  try {
    const userId = req.params.userId;
    const result = await UserService.getUserById(userId);
    res.status(200).json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "could not find user" + userId });
  }
}

async function postRegisterUserCtrl(req, res) {
  try {
    const userInfo = req.body;
    const result = await UserService.registerUser(userInfo);
    res.status(201).json({ result }); // 201 Status = "Created"
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not register user" });
  }
}

async function postLoginUserCtrl(req, res) {
  try {
    const userInfo = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await UserService.loginUser(userInfo);
    if (result.tokens.refreshToken) {
      req.session.refreshToken = result.tokens.refreshToken; // refresh token in http only cookie session speichern
    }
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not login" });
  }
}

async function postSendEmailVerificationCtrl(req, res) {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const result = await UserService.sendEmailVerification(authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      err,
      message: err.message || "Could not send verification mail",
    });
  }
}

async function postVerifyUserEmailCtrl(req, res) {
  try {
    const sixDigitCode = req.body.sixDigitCode;
    const authenticatedUserId = req.authenticatedUserId;

    const result = await UserService.verifyUser(sixDigitCode, authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message || "Could not verify email" });
  }
}

async function patchFollowToggleCtrl(req, res) {
  try {
    const userId = req.params.userId;
    const authenticatedUserId = req.authenticatedUserId;

    const updatedUser = await UserService.editFollowing(authenticatedUserId, userId);
    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: "Could not update follower/user" });
  }
}

// doJwtAuth
async function postRefreshTokenCtrl(req, res) {
  try {
    const authenticatedUserId = req.authenticatedUserId;
    const result = await UserService.refreshAccessToken(authenticatedUserId);
    res.json({ result });
  } catch (err) {
    console.log(err);
    res.status(500).json({ err, message: err.message });
  }
}

// async function postLogoutUser(req, res) {
//   req.session.refreshToken = null; // refresh token löschen
//   res.status(200).json({ result: { message: "you are now logged out" } });
// }

export const UserController = {
  getUserByIdCtrl,
  postRegisterUserCtrl,
  postLoginUserCtrl,
  postSendEmailVerificationCtrl,
  postVerifyUserEmailCtrl,
  patchFollowToggleCtrl,
  postRefreshTokenCtrl,
};
