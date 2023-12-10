import { bundleMDX } from "mdx-bundler"
import remarkEmbedder, { type TransformerInfo } from "@remark-embedder/core"
import oembedTransformer from "@remark-embedder/transformer-oembed"
import fs from "fs-extra"
import type * as H from "hast"
import type * as U from "unified"
import gfm from "remark-gfm"
import { remarkCodeBlocksShiki } from "@kentcdodds/md-temp"
import { visit } from "unist-util-visit"
import remarkSlug from "remark-slug"
import remarkAutolinkHeadings from "remark-autolink-headings"
import { cachified } from "cachified"
import { redis, redisCacheAdapter } from "~/services/redis.server.ts"

const rehypePlugins: U.PluggableList = [trimCodeBlocks, remarkCodeBlocksShiki]
const remarkPlugins: U.PluggableList = [
  [
    // @ts-expect-error
    remarkEmbedder.default,
    {
      handleError: handleEmbedderError,
      handleHTML: handleEmbedderHtml,
      transformers: [oembedTransformer.default],
    },
  ],
]

interface Heading {
  id: number
  slug: string
  title: string
  level: number
}

function extractHeadings(mdx: string): Heading[] {
  const headingMatcher = /^(#+)\s(.+)$/gm

  const headings: Array<Heading> = []
  let match = headingMatcher.exec(mdx)
  while (match !== null) {
    const id = Math.floor(Math.random() * 900000) + 100000
    const level = match[1].length
    const title = match[2].trim()
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .replace(/\s+/g, "-")

    headings.push({ id, slug, title, level })
    match = headingMatcher.exec(mdx)
  }

  return headings
}

export async function compileMdx(html: string) {
  const headings: Heading[] = extractHeadings(html)
  const code = await bundleMDX({
    source: html,
    mdxOptions(options) {
      options.remarkPlugins = [
        ...(options?.remarkPlugins ?? []),
        remarkSlug,
        [remarkAutolinkHeadings, { behavior: "wrap" }],
        gfm,
        ...remarkPlugins,
      ]
      options.rehypePlugins = [
        ...(options?.rehypePlugins ?? []),
        // rehypeSlug,
        ...rehypePlugins,
      ]
      return options
    },
  })

  return {
    code,
    headings,
  }
}

export type ReturnCompiledMdx = Awaited<ReturnType<typeof compileMdx>>

async function getMdxCache(slug: string) {
  return cachified({
    cache: redisCacheAdapter(redis),
    forceFresh: false,
    key: `slug-${slug}`,
    async getFreshValue() {
      const a = await fs.readFile(process.cwd() + slug, "utf-8")
      console.log({ a })
      const { code, headings } = await compileMdx(a)
      return { code, headings }
    },
  })
}

async function getFreshValue(slug: string) {
  const a = await fs.readFile(process.cwd() + slug, "utf-8")
  console.log("Fresh")
  const { code, headings } = await compileMdx(a)
  return { code, headings }
}

export async function getMdx(slug: string) {
  // console.time("speed")
  // const { code, headings } = await getFreshValue(slug)
  // console.timeEnd("speed")
  console.time("speed-1")
  const { code, headings } = await getMdxCache(slug)
  console.timeEnd("speed-1")
  return { code, headings }
}

function handleEmbedderError({ url }: { url: string }) {
  return `<p>Error embedding <a href="${url}">${url}</a></p>.`
}

type GottenHTML = string | null
function handleEmbedderHtml(html: GottenHTML, info: TransformerInfo) {
  if (!html) return null

  const url = new URL(info.url)
  // matches youtu.be and youtube.com
  if (/youtu\.?be/.test(url.hostname)) {
    // this allows us to set youtube embeds to 100% width and the
    // height will be relative to that width with a good aspect ratio
    return makeEmbed(html, "youtube")
  }
  if (url.hostname.includes("codesandbox.io")) {
    return makeEmbed(html, "codesandbox", "80%")
  }
  return html
}

function makeEmbed(html: string, type: string, heightRatio = "56.25%") {
  return `
  <div class="embed" data-embed-type="${type}">
    <div style="padding-bottom: ${heightRatio}">
      ${html}
    </div>
  </div>
`
}

function trimCodeBlocks() {
  return async function transformer(tree: H.Root) {
    visit(tree, "element", (preNode: H.Element) => {
      if (preNode.tagName !== "pre" || !preNode.children.length) {
        return
      }
      const codeNode = preNode.children[0]
      if (
        !codeNode ||
        codeNode.type !== "element" ||
        codeNode.tagName !== "code"
      ) {
        return
      }
      const [codeStringNode] = codeNode.children
      if (!codeStringNode) return

      if (codeStringNode.type !== "text") {
        console.warn(
          `trimCodeBlocks: Unexpected: codeStringNode type is not "text": ${codeStringNode.type}`
        )
        return
      }
      codeStringNode.value = codeStringNode.value.trim()
    })
  }
}
