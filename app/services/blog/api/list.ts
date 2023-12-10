import { z } from "zod"
import { Blog } from "../model.server.ts"
import { blogPreviewSchema } from "../schema.ts"
import { aggregationValidator, createPipelines } from "../../db.server.ts"

type BlogListParams = {
  isFeatured?: boolean | undefined
}

export async function blogList(params: BlogListParams) {
  const { isFeatured } = params
  const { pipelines } = createPipelines()

  if (typeof isFeatured === "boolean") {
    pipelines.push({ $match: { isFeatured } })
  }

  pipelines.push(
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
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
    }
  )

  const query = await Blog.aggregate(pipelines)

  return aggregationValidator(query, z.array(blogPreviewSchema))
}
