import { Link } from "@remix-run/react"
import { motion } from "framer-motion"

export function Logo() {
  return (
    <Link to="/" className="flex font-bold text-2xl relative max-w-min">
      <span className="text-accent-red" style={{ transform: "scaleX(-1)" }}>
        R
      </span>
      <span>Dev</span>
      <motion.div
        style={{ opacity: 0 }}
        animate={{
          opacity: 1,
        }}
        transition={{ duration: 0.3 }}
        className="bg-accent-red w-2 h-2 rounded-full absolute top-2 -right-2"
      />
    </Link>
  )
}
