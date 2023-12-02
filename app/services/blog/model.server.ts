import { Schema, model } from "mongoose"

const DB_BLOG = "blog"

const schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
  },
  { timestamps: true }
)

export const Blog = model(DB_BLOG, schema, DB_BLOG)
