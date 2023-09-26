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
  const opacity = useTransform(scrollYProgress, [0, 0.8, 1], [1, 1, 0])
  const y = useTransform(
    scrollYProgress,
    [0.2, 0.5, 1],
    ["0vh", "-20vh", "0vh"]
  )

  return (
    <div ref={ref} className="">
      <section className="px-4 flex h-screen flex-col relative">
        <div className="text-[5rem] inset-0 justify-center filter mix-blend-difference sm:text-[6rem] fixed md:text-[8rem] flex flex-col pt-10 font-bold z-40">
          <motion.div style={{ marginRight: "auto", x: creativeX, y, opacity }}>
            <AnimatedTextTemplate1 text="Creative" />
          </motion.div>
          <motion.div style={{ marginLeft: "auto", x: developerX, y, opacity }}>
            <AnimatedTextTemplate1 text="Developer" />
          </motion.div>
        </div>
        <p className="text-2xl fixed bottom-10 left-6 italic font-thin">
          rizqynugroho88@gmail.com
        </p>
      </section>
      <SkillSet />
    </div>
  )
}
