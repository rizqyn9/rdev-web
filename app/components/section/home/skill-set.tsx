import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated"

const images = {
  1: [
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  ],
}

export function SkillSet() {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  const visible = useInView(refSpan)
  const { scrollYProgress } = useScroll({
    // target: ref,
    // offset: ["start", "end"],
  })

  const up = useTransform(scrollYProgress, [0, 1], ["-200vh", "0vh"])
  const down = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"])

  return (
    <>
      <section
        className="bg-white flex items-center justify-center relative h-[95vh] min-h-full"
        id="skill-set"
        ref={ref}
      >
        <div className="absolute z-50 mix-blend-difference">
          <AnimatedTextTemplate2
            visible={visible}
            // text="My evolving skillset"
            text="My"
            className="text-6xl font-extrabold left-[3vw] top-10"
          />
          <AnimatedTextTemplate2
            visible={visible}
            // text="My evolving skillset"
            text="Projects"
            className="text-6xl font-extrabold left-[3vw] top-10"
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[200vh] md:max-h-screen overflow-hidden z-10 absolute inset-0">
          <motion.div style={{ y: up }}>
            {images[1].map((x, idx) => {
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
          <motion.div style={{ y: down }}>
            {images[1].map((x, idx) => {
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
          <motion.div style={{ y: up }}>
            {images[1].map((x, idx) => {
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
        </div>
        <span className="absolute bottom-0 z-50" ref={refSpan}>
          /
        </span>
      </section>
    </>
  )
}
