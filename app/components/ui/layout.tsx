import clsxm from "~/utils/clsxm.tsx"
import { Footer } from "./footer.tsx"

type LayoutProps = {} & JSX.IntrinsicElements["div"]

export function Layout(props: LayoutProps) {
  const { className, children, ...rest } = props
  return (
    <div className={clsxm("relative mt-14 md:mt-24", className)} {...rest}>
      {children}
      <Footer />
    </div>
  )
}

type SectionProps = {
  containerClassName?: string
  containerChildren?: React.ReactNode
  wrapNav?: boolean
} & JSX.IntrinsicElements["section"]
export function Section(props: SectionProps) {
  const {
    className,
    children,
    containerClassName,
    containerChildren,
    wrapNav = false,
    ...rest
  } = props
  return (
    <section
      className={clsxm([
        "mx-[5vw] relative",
        wrapNav && "pt-28",
        containerClassName,
      ])}
      {...rest}
    >
      {containerChildren}
      <div className={clsxm("max-w-7xl mx-auto", className)}>{children}</div>
    </section>
  )
}
