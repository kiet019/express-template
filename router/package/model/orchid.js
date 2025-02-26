import { Schema, model } from "mongoose";
import { commentSchema } from "./comment.js";
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
