import type { MetaFunction } from "@remix-run/node"
import { AnimatedText } from "~/components/animated-text"
import { Nav } from "~/components/nav"
import { motion } from "framer-motion"

export const meta: MetaFunction = () => {
  return [
    { title: "RDev." },
    { name: "description", content: "Welcome to RDev!" },
  ]
}

export default function Index() {
  return (
    <div>
      <Nav />
      <motion.div
        initial="hidden"
        animate={"visible"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.025,
            },
          },
        }}
      >
        <AnimatedText />
      </motion.div>
    </div>
  )
}
