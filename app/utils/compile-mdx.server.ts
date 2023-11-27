import { bundleMDX } from "mdx-bundler"
import rehypeSlug from "rehype-slug"

export async function compileMdx(html: string) {
  return bundleMDX({
    source: html,
    mdxOptions(options) {
      options.rehypePlugins = [...(options?.rehypePlugins ?? []), rehypeSlug]
      return options
    },
  })
}
