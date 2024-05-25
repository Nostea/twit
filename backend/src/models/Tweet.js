import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
    username: { type: String },
    profileImg: { type: String },
  },
  { collection: "tweets", timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
