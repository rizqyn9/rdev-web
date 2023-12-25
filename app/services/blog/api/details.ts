import { NotFound } from "~/utils/error/index.ts"
import { Blog } from "../model.server.ts"
import { BlogDto } from "../schema.ts"

type Filter = { slug: string } | { id: string }

type Opts = {}

export async function findBlogDetails(
  filter: Filter,
  opts: Opts = {}
): Promise<BlogDto & { createdAt: Date; timeToRead: number }> {
  let match = "slug" in filter ? { slug: filter.slug } : { _id: filter.id }
  const blog = await Blog.findOne(match).select(["-content"])

  if (!blog) throw new NotFound()

  return blog
}

export async function findBlogMdx(
  filter: Filter,
  opts: Opts = {}
): Promise<Pick<BlogDto, "content">> {
  let match = "slug" in filter ? { slug: filter.slug } : { _id: filter.id }
  const blog = await Blog.findOne(match)
  if (!blog) throw new NotFound()
  return { content: blog.content }
}

export async function findBlog(filter: Filter, opts: Opts = {}) {
  let match = "slug" in filter ? { slug: filter.slug } : { _id: filter.id }
  const blog = await Blog.findOne(match)
  if (!blog) throw new NotFound()
  return blog
}
