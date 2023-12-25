import {
  motion,
  useInView,
  useScroll,
  useTransform,
  easeInOut,
} from "framer-motion"
import React, { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated.tsx"

const images = {
  1: [
    "https://ik.imagekit.io/connect2203/lingotalk__Tqy5O_x0",
    "https://ik.imagekit.io/connect2203/cariguru_2cOPIvisl",
    "https://ik.imagekit.io/connect2203/blups_TEj24XpbI",
    "https://ik.imagekit.io/connect2203/tabe_DO71LH86l",
  ],
  2: [
    "https://ik.imagekit.io/connect2203/cariguru_2cOPIvisl",
    "https://ik.imagekit.io/connect2203/connect_J_vilrSMj",
    "https://ik.imagekit.io/connect2203/blups_TEj24XpbI",
    "https://ik.imagekit.io/connect2203/lingotalk__Tqy5O_x0",
  ],
  3: [
    "https://ik.imagekit.io/connect2203/cariguru_2cOPIvisl",
    "https://ik.imagekit.io/connect2203/tabe_DO71LH86l",
    "https://ik.imagekit.io/connect2203/blups_TEj24XpbI",
    "https://ik.imagekit.io/connect2203/lingotalk__Tqy5O_x0",
  ],
}

export function SkillSet() {
  const ref = useRef<HTMLDivElement>(null)
  const refSpan = useRef<HTMLSpanElement>(null)
  const visible = useInView(refSpan, {})
  const { scrollYProgress } = useScroll({
    // target: ref,
    // offset: ["start", "end"],
  })

  const up = useTransform(scrollYProgress, [0, 1], ["-200vh", "0vh"], {
    ease: easeInOut,
  })

  const down = useTransform(scrollYProgress, [0, 1], ["0vh", "-50vh"], {
    ease: easeInOut,
  })

  return (
    <>
      <section
        className="flex flex-col items-center justify-center relative h-[95vh] min-h-full"
        id="featured-project"
        ref={ref}
      >
        <motion.div
          className="z-20 -mb-24 md:mb-0 m-auto text-4xl md:text-8xl lg:text-[10rem] flex flex-col items-center justify-center mix-blend-difference"
          whileHover={{}}
        >
          <AnimatedTextTemplate2
            visible={visible}
            // text="My evolving skillset"
            text="Featured"
            className="font-extrabold"
          />
          <AnimatedTextTemplate2
            visible={visible}
            // text="My evolving skillset"
            text="Projects"
            className="font-thin"
          />
        </motion.div>
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 max-h-[200vh] md:max-h-screen overflow-hidden z-10 absolute inset-0">
          <motion.div
            style={{ y: up }}
            className="flex flex-col gap-6"
            animate={{
              transition: {
                duration: 10,
              },
            }}
          >
            {images[1].map((x, idx) => {
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            style={{ y: down }}
            animate={{
              transition: {
                duration: 10,
              },
            }}
          >
            {images[2].map((x, idx) => {
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
          <motion.div
            className="flex flex-col gap-4"
            style={{ y: up }}
            animate={{
              transition: {
                duration: 10,
              },
            }}
          >
            {images[1].map((x, idx) => {
              return <img key={idx} src={x} alt={x} crossOrigin="anonymous" />
            })}
          </motion.div>
        </div>
        <span className="mt-auto mb-16 z-50" ref={refSpan}>
          &nbsp;
        </span>
      </section>
    </>
  )
}
