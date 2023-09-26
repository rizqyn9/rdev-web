import {
  motion,
  useInView,
  useScroll,
  useTransform,
  easeInOut,
} from "framer-motion"
import { useRef } from "react"
import { AnimatedTextTemplate2 } from "~/components/typography/animated"

const images = {
  2: [
    "https://ik.imagekit.io/connect2203/notopeli/95D22631-0403-493D-847B-2FDC7D66664D%202_thVUMkEqz.JPG?updatedAt=1695703039700",
    "https://ik.imagekit.io/connect2203/notopeli/1FBB47DC-6A18-4AB6-941D-303AA3D59E70%202_1gA12AxTu.JPG?updatedAt=1695703039875",
    "https://ik.imagekit.io/connect2203/notopeli/IMG_5137%202_FlkFsJbuh-.HEIC?updatedAt=1695703040068",
    "https://ik.imagekit.io/connect2203/notopeli/93C27CBF-EECD-4BFB-9B74-C93CDC81079B%202_slZKx6Daa4.JPG?updatedAt=1695703039951",
  ],
  1: [
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
          className="z-50 -mb-24 md:mb-0 m-auto text-4xl md:text-8xl lg:text-[10rem] flex flex-col items-center justify-center mix-blend-difference"
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
            {images[1].map((x, idx) => {
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
              return <img key={idx} src={x} alt={x} />
            })}
          </motion.div>
        </div>
        <span className="mt-auto mb-16 z-50 bg-red-600" ref={refSpan}>
          /
        </span>
      </section>
    </>
  )
}
