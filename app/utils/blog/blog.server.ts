import { cachified } from "cachified"
import { redis, redisCacheAdapter } from "~/services/redis.server.ts"
import { findBlogDetails, findBlogMdx } from "~/services/blog/api/details.ts"
import { compileMdx } from "../compile-mdx.server.ts"

async function getCompiledMdxCache(slug: string) {
  return cachified({
    key: `mdx:${slug}`,
    cache: redisCacheAdapter(redis),
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

export async function findBlogBySlug(slug: string) {
  const [{ code, headings }, blog] = await Promise.all([
    getCompiledMdxCache(slug),
    findBlogDetails({ slug }),
  ])

  return {
    code,
    headings,
    title: blog.title,
    like: blog.like,
    view: blog.view,
    categories: blog.tags.map((x) => ({ text: x })),
    description: blog.desc,
    banner: {
      title: blog.banner.title,
      src: blog.banner.url,
    },
  }
}
