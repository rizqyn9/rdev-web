import { bundleMDX } from "mdx-bundler"
import rehypeSlug from "rehype-slug"

export async function compileMdx(html: string) {
  const code = await bundleMDX({
    source: html,
    mdxOptions(options) {
      options.remarkPlugins = [...(options.remarkPlugins ?? [])]
      options.rehypePlugins = [...(options?.rehypePlugins ?? []), rehypeSlug]
      return options
    },
  })

  return code
}
