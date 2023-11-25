import { useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated.tsx"

export function AboutMe() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  return (
    <section ref={ref} className="text-black" id="about-me">
      <div className="container bg-white px-6 py-24">
        <div className="flex flex-col text-[5rem] font-extrabold [&>*]:-my-8">
          <AnimatedTextTemplate2 text="Solve Hard" visible={visible} />
          <AnimatedTextTemplate2 text="Problems" visible={visible} />
          <AnimatedTextTemplate2 text="Climate" visible={visible} />
        </div>
        <div className="text-4xl flex flex-col gap-4">
          <p>Motivated to</p>
          <p>learn new technologies</p>
        </div>
      </div>
    </section>
  )
}
