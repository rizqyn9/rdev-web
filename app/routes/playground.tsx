import clsxm from "~/utils/clsxm.tsx"

type LayoutProps = {} & JSX.IntrinsicElements["div"]

function Layout(props: LayoutProps) {
  const { className, ...rest } = props
  return (
    <div
      className={clsxm(
        "container px-4 mt-12 md:mt-24 md:bg-red-300 min-h-screen"
      )}
      {...rest}
    />
  )
}

export default function () {
  return <Layout>as</Layout>
}
