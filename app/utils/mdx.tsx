import React from "react"
import { LRUCache } from "lru-cache"
import * as mdxBundler from "mdx-bundler/client/index.js"
import { Banner } from "../components/ui/banner/index.tsx"
import { AnchorOrLink } from "~/components/ui/anchor-or-link.tsx"
import { Pre } from "~/components/ui/pre.tsx"

export async function getHeadings(source: string) {
  // Get each line individually, and filter out anything that
  // isn't a heading.
  const headingLines = source.split("\n").filter((line) => {
    return line.match(/^###*\s/)
  })

  // Transform the string '## Some text' into an object
  // with the shape '{ text: 'Some text', level: 2 }'
  return headingLines.map((raw) => {
    const text = raw.replace(/^###*\s/, "")
    // I only care about h2 and h3.
    // If I wanted more levels, I'd need to count the
    // number of #s.
    const level = raw.slice(0, 3) === "###" ? 3 : 2

    return { text, level }
  })

  return headingLines
}

const listComponents = {
  a: AnchorOrLink,
  pre: Pre,
}

/**
 * This should be rendered within a useMemo
 * @param code the code to get the component from
 * @returns the component
 */
function getMdxComponent(code: string) {
  const Component = mdxBundler.getMDXComponent(code, {})
  function RdevMdxComponents({
    components,
    ...rest
  }: Parameters<typeof Component>["0"]) {
    return (
      <Component
        // @ts-expect-error
        components={{
          Banner,
          ...listComponents,
          ...components,
        }}
        {...rest}
      />
    )
  }
  return RdevMdxComponents
}

// This exists so we don't have to call new Function for the given code
// for every request for a given blog post/mdx file.
const mdxComponentCache = new LRUCache<
  string,
  ReturnType<typeof getMdxComponent>
>({
  max: 1000,
})

export function useMdxComponent(code: string) {
  return React.useMemo(() => {
    if (mdxComponentCache.has(code)) {
      return mdxComponentCache.get(code)!
    }
    const component = getMdxComponent(code)
    mdxComponentCache.set(code, component)
    return component
  }, [code])
}
