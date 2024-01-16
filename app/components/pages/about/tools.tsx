import { motion } from "framer-motion"
import { Card } from "./card.tsx"

type Tool = {
  name: string
  icon: string
  href: string
}

export const TOOLS: Tool[] = [
  {
    name: "FIGMA",
    icon: "/static/tools/figma.png",
    href: "/static",
  },
  {
    name: "BRAVE",
    icon: "/static/tools/brave.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "GPT",
    icon: "/static/tools/chat-gpt.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "DOCKER",
    icon: "/static/tools/docker.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "GITHUB",
    icon: "/static/tools/github.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "GRAMMARLY",
    icon: "/static/tools/grammarly.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "INSOMNIA",
    icon: "/static/tools/insomnia.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "LINEAR",
    icon: "/static/tools/linear.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "MIRO",
    icon: "/static/tools/miro.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "COMPASS",
    icon: "/static/tools/mongodb-compass.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "NOTION",
    icon: "/static/tools/notion.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "POSTMAN",
    icon: "/static/tools/postman.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "VSCODE",
    icon: "/static/tools/vscode.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "WARP",
    icon: "/static/tools/warp.png",
    href: "/static/tools/figma.png",
  },
  {
    name: "XCODE",
    icon: "/static/tools/xcode.png",
    href: "/static/tools/figma.png",
  },
]

export function AboutTools() {
  return (
    <Card className="p-6 pr-8 text-lg">
      <h1>TOOL STACK</h1>
      <div className="flex flex-wrap mt-4">
        {TOOLS.map((tool, idx) => (
          <motion.div
            className="relative w-12 h-12 rounded-2xl mr-2 mb-2"
            key={idx}
            variants={{
              iddle: {
                scale: 1,
              },
              hover: {
                scale: 1.1,
              },
            }}
            transition={{
              duration: 0.3,
              ease: "easeOut",
            }}
            initial="iddle"
            whileHover="hover"
          >
            <motion.p
              className="uppercase mx-auto border font-semibold p-1 leading-none border-white/10 absolute pointer-events-none h-min whitespace-nowrap text-center text-[8px] bg-black/30 backdrop-blur-sm rounded-sm"
              style={{ y: "-90%", translateX: "-50%", left: "50%" }}
              variants={{
                iddle: { opacity: 0, rotateX: "45deg" },
                hover: { opacity: 1, rotateX: "0deg" },
              }}
            >
              {tool.name}
            </motion.p>
            <div>
              <img alt={tool.name} src={tool.icon} />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
