import { Schema } from "mongoose"
import { getModel } from "../db.server.ts"

const DB_BLOG = "blog"

const bannerSchema = new Schema(
  {
    title: { type: String, default: "" },
    url: {
      type: String,
      default: "https://creatures.dev/_astro/charts-3.56128dcd_B0Jwd.webp",
    },
  },
  { _id: false }
)

const authorSchema = new Schema(
  {
    name: { type: String, default: "Rizqy Nugroho" },
    avatar: {
      type: String,
      default:
        "https://ik.imagekit.io/connect2203/rdevblog/avatar_PRYh9Z9Bx.png?updatedAt=1701681868075",
    },
  },
  { _id: false }
)

const schema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    desc: { type: String, default: "" },
    banner: {
      type: bannerSchema,
      default: {},
    },
    content: { type: String, default: "" },
    tags: { type: [String], default: [] },
    isFeatured: { type: Boolean, default: false },
    view: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    author: {
      type: authorSchema,
      default: {},
    },
  },
  { timestamps: true }
)

export const Blog = getModel(DB_BLOG, schema)
