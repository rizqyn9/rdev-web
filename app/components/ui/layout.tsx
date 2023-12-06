import clsxm from "~/utils/clsxm.tsx"
import { Footer } from "./footer.tsx"

type LayoutProps = {} & JSX.IntrinsicElements["div"]

export function Layout(props: LayoutProps) {
  const { className, children, ...rest } = props
  return (
    <div className={clsxm("relative mt-12 md:mt-24")} {...rest}>
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
      {children}
    </section>
  )
}
