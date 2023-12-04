import { z } from "zod"
import { Blog } from "./model.server.ts"
import { blogPreviewSchema } from "./schema.ts"
import { aggregationValidator, createPipelines } from "../db.server.ts"

export const blogDto = z.object({
  title: z.string(),
  slug: z.string(),
  content: z.string(),
  tags: z.array(z.string()).default([]),
})

export type BlogDto = z.infer<typeof blogDto>

export async function createBlog(blog: BlogDto) {
  const newBlog = new Blog(blog)

  await newBlog.save().catch((err: Error) => {
    console.log(err.message)
  })

  return newBlog
}

type BlogListParams = {
  isFeatured?: boolean
}

export async function blogList(params: BlogListParams) {
  const { pipelines } = createPipelines()

  if (params.isFeatured) {
    pipelines.push({ $match: { isFeatured: true } })
  } else {
    pipelines.push({ $match: { isFeatured: false } })
  }

  pipelines.push({
    $project: {
      id: "$_id",
      title: 1,
      slug: 1,
      desc: 1,
      tags: 1,
      author: 1,
      date: "$createdAt",
      banner: 1,
    },
  })

  const query = await Blog.aggregate(pipelines)

  return aggregationValidator(query, z.array(blogPreviewSchema))
}
