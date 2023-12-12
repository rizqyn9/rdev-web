import { cachified } from "cachified"
import { redis, redisCacheAdapter } from "~/services/redis.server.ts"
import { findBlogDetails, findBlogMdx } from "~/services/blog/api/details.ts"
import { compileMdx } from "../compile-mdx.server.ts"
import { dateFormatEn } from "../date.ts"

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
