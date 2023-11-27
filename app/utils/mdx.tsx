import React from "react"
import * as mdxBundler from "mdx-bundler/client/index.js"
import { Banner } from "../components/ui/banner/index.tsx"
import { AnchorOrLink } from "~/components/ui/anchor-or-link.tsx"

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
    return component
  }, [code])
}
