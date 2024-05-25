import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import cookieSession from "cookie-session";
import { connectToDatabase } from "./models/index.js";
import { userRouter } from "./routes/userRouter.js";
import { tweetRouter } from "./routes/tweetRouter.js";
import { commentRouter } from "./routes/commentController.js";

dotenv.config();

const app = express();

const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost = process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

// re-configure cors middleware
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));
/////////// add parser for cookies
app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
  name: "session",
  secret: cookieSessionSecret, // frei wählbar
  httpOnly: true,
  expires: new Date(Date.now() + twoWeeksInMs),
  sameSite: isFrontendLocalhost ? "lax" : "none",
  secure: isFrontendLocalhost ? false : true,
};
app.use(cookieSession(cookieSessionOptions));

app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/tweets", tweetRouter);
app.use("/api/v1/comments", commentRouter);

try {
  await connectToDatabase();
  const PORT = process.env.PORT || 3011;
  app.listen(PORT, () => console.log("Server ready at port", PORT));
} catch (err) {
  console.log(err);
  process.exit(1);
}
