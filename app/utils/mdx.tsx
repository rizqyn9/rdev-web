import React from "react"
import * as mdxBundler from "mdx-bundler/client/index.js"
import { Banner } from "../components/ui/banner/index.tsx"
import { AnchorOrLink } from "~/components/ui/anchor-or-link.tsx"

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
        components={{
          Banner,
          // @ts-expect-error
          a: AnchorOrLink,
          ...components,
        }}
        {...rest}
      />
    )
  }
  return RdevMdxComponents
}

export function useMdxComponent(code: string) {
  return React.useMemo(() => {
    // if (mdxComponentCache.has(code)) {
    //   return mdxComponentCache.get(code)!
    // }
    const component = getMdxComponent(code)
    // const a = React.Children.toArray(component).map(console.log)
    // .filter(
    //   (child: any) =>
    //     child.props?.mdxType && ["h2", "h3"].includes(child.props.mdxType)
    // )
    // .map((child: any) => ({
    //   url: "#" + child.props.id,
    //   depth:
    //     (child.props?.mdxType &&
    //       parseInt(child.props.mdxType.replace("h", ""), 0)) ??
    //     0,
    //   text: child.props.children,
    // }))
    // console.log({ a })
    return component
  }, [code])
}
