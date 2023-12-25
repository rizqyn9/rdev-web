import { motion, useInView } from "framer-motion"
import type { ComponentProps } from "react"
import { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated.tsx"
import clsxm from "~/utils/clsxm.tsx"

const PROJECTS = [
  {
    title: "Lingotalk",
    picture: "https://ik.imagekit.io/connect2203/lingotalk__Tqy5O_x0",
    desc: "Backend",
  },
  {
    title: "Cariguru",
    picture: "https://ik.imagekit.io/connect2203/cariguru_2cOPIvisl",
    desc: "Fullstack",
  },
  {
    title: "CIMB",
    picture: "https://ik.imagekit.io/connect2203/cimb_UkDdwM0hS",
    desc: "Frontend",
  },
  {
    title: "Blups asia",
    picture: "https://ik.imagekit.io/connect2203/blups_ZHMP10XVH",
    desc: "Frontend",
  },
  {
    title: "Tabe",
    picture: "https://ik.imagekit.io/connect2203/tabe_DO71LH86l",
    desc: "Dev Lead",
  },
  {
    title: "ConnectCoffee",
    picture: "https://ik.imagekit.io/connect2203/connect_J_vilrSMj",
    desc: "Full Stack",
  },
]

type ImageInViewProps = ComponentProps<typeof motion.img> & {
  title: string
  desc: string
}

export function ImageInView(props: ImageInViewProps) {
  const { className, title, desc, ...rest } = props
  const ref = useRef<HTMLImageElement>(null)
  const visible = useInView(ref)

  return (
    <motion.div
      className="overflow-hidden flex flex-col"
      initial="hidden"
      animate={visible ? "visible" : "hidden"}
    >
      <div className="flex items-end">
        <AnimatedTextTemplate2
          text={`${title} /`}
          visible={visible}
          className="text-xl font-bold md:text-2xl"
        />
        <AnimatedTextTemplate2
          text={desc}
          visible={visible}
          className="font-thin md:text-xl"
        />
      </div>
      <div className="aspect-w-1 aspect-h-1">
        <motion.img
          {...rest}
          ref={ref}
          variants={{
            visible: {
              y: "0%",
              scale: 1,
              opacity: 1,
            },
            hidden: {
              y: "80%",
              scale: 2,
              opacity: 0.6,
            },
          }}
          transition={{
            duration: 0.5,
          }}
          className={clsxm("w-full object-cover", className)}
        />
      </div>
    </motion.div>
  )
}

export function SelectedProject() {
  const ref = useRef<HTMLElement>(null)
  const visible = useInView(ref)

  return (
    <section ref={ref} className="min-h-[96vh]" id="work">
      <div className="container flex flex-col py-16">
        <div className="flex justify-end items-end flex-col w-full font-extrabold md:text-8xl text-4xl">
          <AnimatedTextTemplate2 text="Selected" visible={visible} />
          <AnimatedTextTemplate2
            text="Project"
            visible={visible}
            className="ml-auto"
          />
        </div>
        <div className="grid md:grid-cols-2 gap-5 mt-8 lg:grid-cols-3">
          {PROJECTS.map((project, idx) => {
            return (
              <div key={idx} className="flex flex-col">
                <ImageInView
                  src={project.picture}
                  title={project.title}
                  desc={project.desc}
                />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
