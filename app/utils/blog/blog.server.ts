import { cachified } from "cachified"
import { redis, redisCacheAdapter } from "~/services/redis.server.ts"
import { findBlogDetails, findBlogMdx } from "~/services/blog/api/details.ts"
import { compileMdx } from "../compile-mdx.server.ts"
import { dateFormatEn } from "../date.ts"
import { z } from "zod"
import { parse } from "@conform-to/zod"
import {
  createBlog,
  createBlogDto,
  editBlog,
} from "~/services/blog/api/create.server.ts"

async function getCompiledMdxCache(slug: string, forceFresh = false) {
  return cachified({
    key: `mdx:${slug}`,
    cache: redisCacheAdapter(redis),
    forceFresh,
    checkValue(val) {
      return !!val && typeof val === "object"
    },
    async getFreshValue() {
      const { content } = await findBlogMdx({ slug })
      const { code, headings } = await compileMdx(content)
      return { code, headings }
    },
  })
}

export async function invalidateBlogCache(params: { slug: string }) {
  await getCompiledMdxCache(params.slug, true)
}

export async function findBlogBySlug(slug: string) {
  const [{ code, headings }, blog] = await Promise.all([
    getCompiledMdxCache(slug),
    findBlogDetails({ slug }),
  ])

  return {
    code,
    author: blog.author,
    headings,
    title: blog.title,
    like: blog.like,
    view: blog.view,
    categories: blog.tags.map((x) => ({ text: x })),
    description: blog.desc,
    createdAt: dateFormatEn(blog.createdAt),
    banner: {
      title: blog.banner.title,
      src: blog.banner.url,
    },
  }
}

export const inputSchema = z.object({
  content: z.string().min(1),
})

export async function handleCreateBlog(request: Request) {
  const submission = parse(await request.formData(), { schema: inputSchema })

  if (!submission.value) {
    console.log({ err: submission.error })
    throw new Error("Invalid submission")
  }

  const {
    code: { frontmatter },
  } = await compileMdx(submission.value.content)

  const validate = createBlogDto.safeParse({
    content: submission.value.content,
    ...frontmatter,
  })
  if (!validate.success) {
    throw new Error("Invalid submission")
  }

  const blog = await createBlog(validate.data)

  return blog
}

export async function handleEditBlog(id: string, request: Request) {
  const submission = parse(await request.formData(), { schema: inputSchema })

  if (!submission.value) {
    console.log({ err: submission.error })
    throw new Error("Invalid submission")
  }

  const {
    code: { frontmatter },
  } = await compileMdx(submission.value.content)

  const validate = createBlogDto.safeParse({
    content: submission.value.content,
    ...frontmatter,
  })
  if (!validate.success) {
    throw new Error("Invalid submission")
  }

  const blog = await editBlog({ ...validate.data, id })

  return blog
}
