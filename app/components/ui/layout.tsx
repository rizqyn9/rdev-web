import clsxm from "~/utils/clsxm.tsx"

type LayoutProps = {} & JSX.IntrinsicElements["div"]

export function Layout(props: LayoutProps) {
  const { className, ...rest } = props
  return (
    <div
      className={clsxm("container px-4 mt-12 md:mt-24 min-h-screen")}
      {...rest}
    />
  )
}
