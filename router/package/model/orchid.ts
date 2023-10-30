import { Schema, model } from "mongoose";
import { Comment, commentSchema } from "./comment.ts";
import { Category } from "./category.ts";

export const orchidSchema = new Schema(
  {
    name: { type: String, require: true },
    image: { type: String, require: true },
    isNatural: { type: Boolean, default: false },
    origin: { type: String, require: true },
    comments: [commentSchema],
    category: {
      type: Schema.Types.ObjectId,
      ref: "category",
      require: true,
    },
  },
  { timestamps: true }
);

export const orchidModel = model("orchid", orchidSchema)

export interface Orchid {
  _id: any
  name: string,
  origin: string,
  isNatural: boolean,
  category: Category
  image: string,
  comment: Comment[]
}