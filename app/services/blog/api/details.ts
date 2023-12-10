import { NotFound } from "~/utils/error/index.ts"
import { Blog } from "../model.server.ts"
import { BlogDto } from "../schema.ts"

type Filter = {
  slug: string
}

type Opts = {}

export async function findBlogDetails(
  filter: Filter,
  opts: Opts = {}
): Promise<BlogDto> {
  const blog = await Blog.findOne({ slug: filter.slug }).select(["-content"])
  if (!blog) throw new NotFound()

  return blog
}

export async function findBlogMdx(
  filter: Filter,
  opts: Opts = {}
): Promise<Pick<BlogDto, "content">> {
  const blog = await Blog.findOne({ slug: filter.slug })
  if (!blog) throw new NotFound()
  return { content: blog.content }
}
