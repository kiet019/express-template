import { Schema, model } from "mongoose";
import { User } from "./user";

export const commentSchema = new Schema(
  {
    rating: { type: Number, min: 1, max: 5, require: true },
    comment: { type: String, require: true },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      require: true,
    },
  },
  { timestamps: true }
);
export const commentModel = model("comment", commentSchema)

export interface Comment {
  _id: any,
  rating: 1 | 2 | 3 | 4 | 5,
  comment: string,
  author: User
}