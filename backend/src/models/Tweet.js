import mongoose from "mongoose";

const tweetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    text: { type: String, required: true },
  },
  { collection: "tweets", timestamps: true }
);

export const Tweet = mongoose.model("Tweet", tweetSchema);
