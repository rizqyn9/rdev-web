import { motion, useInView } from "framer-motion"
import type { ComponentProps } from "react"
import { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated.tsx"
import clsxm from "~/utils/clsxm.tsx"

const PROJECTS = [
  {
    title: "Lingotalk",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "Backend",
  },
  {
    title: "Gopay",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "DevOps",
  },
  {
    title: "Sinarmas",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "Backend",
  },
  {
    title: "Blups asia",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "Frontend",
  },
  {
    title: "Tabe",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "Dev Lead",
  },
  {
    title: "GGPlay",
    picture:
      "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
    desc: "Dev Lead",
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
      className="aspect-square overflow-hidden flex flex-col"
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
        className={clsxm("w-full", className)}
      />
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
