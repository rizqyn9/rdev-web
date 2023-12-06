// import { useRef } from "react"

type PreProps = {} & React.ComponentPropsWithRef<"pre">

export function Pre(props: PreProps) {
  const { children, style } = props
  // const preRef = useRef<HTMLPreElement>(null)

  return <pre style={style}>{children}</pre>
}
