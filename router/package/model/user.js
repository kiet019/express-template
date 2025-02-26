import { Schema, model } from "mongoose";

export const userSchema = new Schema(
  {
    username: { type: String, require: true, unique: true },
    password: { type: String, require: true },
    isAdmin: { type: Boolean, default: false },
    name: {
      type: String,
      require: true,
    },
    YOB: {
      type: Number,
      require: true,
    },
  },
  { timestamps: true }
);

export const userModel = model("user", userSchema);

