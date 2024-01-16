import clsxm from "~/utils/clsxm.tsx"
import React from "react"
import { BGDots } from "~/components/ui/bg-dots.tsx"
import { Section } from "~/components/ui/layout.tsx"
import { motion } from "framer-motion"
import { CardExperience } from "~/components/pages/about.tsx"

export default function AboutMePage() {
  return (
    <>
      <BGDots />
      <Section className="mt-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <CardAboutMe />
            <CardExperience />
          </div>
          <div className="flex flex-col gap-4">
            <CardAvatar />
            <Card className="p-6 pr-8 text-lg">
              <h1>TOOL STACK</h1>
              <div className="grid grid-cols-5 gap-4 mt-5">
                {new Array(10)
                  .fill({ name: "test", icon: "", href: "" })
                  .map((tool, idx) => (
                    <motion.div
                      className="relative bg-slate-600 rounded-2xl aspect-w-1 aspect-h-1"
                      key={idx}
                      variants={{
                        iddle: {
                          scale: 1,
                        },
                        hover: {
                          scale: 1.1,
                        },
                      }}
                      initial="iddle"
                      whileHover="hover"
                    >
                      <motion.p
                        className="w-full h-min whitespace-nowrap text-center text-sm bg-black/30 rounded-sm py-1"
                        variants={{
                          iddle: { opacity: 0, y: "-80%" },
                          hover: { opacity: 1, y: "-100%" },
                        }}
                      >
                        TEST
                      </motion.p>
                      <div></div>
                    </motion.div>
                  ))}
              </div>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}

function Card(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props
  return (
    <div
      className={clsxm([
        "border border-white/20 bg-white/5 p-2 rounded-lg relative overflow-hidden backdrop-blur-sm",
        className,
      ])}
      {...rest}
    />
  )
}

function CardAboutMe() {
  return (
    <Card className="p-6 pr-8 text-lg">
      Fullstack engineer with a passion for creating seamless, user-friendly
      applications. With a solid foundation in both front-end and back-end
      technologies, I thrives in fast-paced environments, tackling complex
      problems with innovative solutions.
    </Card>
  )
}

function CardAvatar() {
  return (
    <Card className="p-0">
      <div className="absolute z-10 inset-x-0 bottom-0 p-2 flex flex-col gap-1 text-sm">
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md rounded-tl-lg whitespace-nowrap">
          Hallo 👋🏼
        </p>
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          My name is Rizqy Prastya Ari Nugroho
        </p>
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          But you can call me Rizqy
        </p>
        <p className="border border-white rounded-bl-lg bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          Grab my email, and get in touch
        </p>
      </div>
      <div
        className="aspect-w-1 aspect-h-1 overflow-hidden object-cover relative grayscale"
        // style={{
        //   boxShadow: "inset 10px 10px 10px 10px rgb(0 0 0 / 1)",
        // }}
      >
        <img
          className="object-cover"
          alt="rizqynugroho"
          title="rizqynugroho"
          src="https://ik.imagekit.io/connect2203/rdevblog/me_uxL2hLXqt.png?updatedAt=1701761952485"
        />
      </div>
    </Card>
  )
}
