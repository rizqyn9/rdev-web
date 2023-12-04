import { Schema } from "mongoose"
import { getModel } from "../db.server.ts"

const DB_BLOG = "blog"

const bannerSchema = new Schema(
  {
    title: { type: String, default: "" },
    url: { type: String, default: "" },
  },
  { _id: false }
)

const schema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, default: "" },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
    preview: { type: String, default: "" },
    isFeatured: { type: Boolean, default: false },
    banner: {
      type: bannerSchema,
      default: null,
    },
  },
  { timestamps: true }
)

export const Blog = getModel(DB_BLOG, schema)
