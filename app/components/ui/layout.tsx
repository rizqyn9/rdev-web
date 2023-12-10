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

type SectionProps = {} & JSX.IntrinsicElements["section"]
export function Section(props: SectionProps) {
  const { className, children, ...rest } = props
  return (
    <section className={clsxm("mx-[10vw] relative", className)} {...rest}>
      <div className="max-w-7xl mx-auto">{children}</div>
    </section>
  )
}
