import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    bio: { type: String },
    email: { type: String, required: true, trim: true },
    profileImg: { type: String, trim: true },
    following: [{ type: String, trim: true }],
    follower: [{ type: String, trim: true }],
    passwordHash: { type: String, required: true, trim: true },
    passwordSalt: { type: String, required: true, trim: true },
    isEmailVerified: { type: Boolean, default: false },
    sixDigitCode: { type: String, required: true },
  },
  { collection: "users", timestamps: true }
);

export const User = mongoose.model("User", userSchema);
