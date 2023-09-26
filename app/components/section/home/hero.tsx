import { motion, useScroll, useTransform } from "framer-motion"
import { AnimatedTextTemplate1 } from "../../typography/animated"
import { useRef } from "react"
import { SkillSet } from "./skill-set"

export function Hero() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start", "end"],
  })

  const creativeX = useTransform(scrollYProgress, [0, 1], ["5%", "30vw"])
  const developerX = useTransform(scrollYProgress, [0, 1], ["-5%", "-21vw"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 0.9], [1, 1, 0])
  const y = useTransform(
    scrollYProgress,
    [0.2, 0.3, 1],
    // ["15vh", "-20vh", "0vh"]
    ["35vh", "40vh", "150vh"]
  )

  return (
    <div ref={ref} className="container">
      <section className="px-4 flex h-screen flex-col relative">
        <div className="text-[3rem] sm:text-[5rem] md:text-[5rem] lg:text-[10rem] inset-0 justify-center filter mix-blend-difference flex flex-col font-bold z-40">
          <motion.div
            style={{ marginRight: "auto", x: creativeX, y, opacity }}
            className="my-auto lg:-mt-[10rem]"
          >
            <AnimatedTextTemplate1 text="Creative" />
          </motion.div>
          <motion.div
            style={{ marginLeft: "auto", x: developerX, y, opacity }}
            className="my-auto"
          >
            <AnimatedTextTemplate1 text="Developer" />
          </motion.div>
        </div>
        <motion.p
          className="text-2xl container italic font-thin mt-auto mb-6"
          style={{ opacity }}
        >
          rizqynugroho88@gmail.com
        </motion.p>
      </section>
      <SkillSet />
    </div>
  )
}
