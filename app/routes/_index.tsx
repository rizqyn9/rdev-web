import { Section } from "~/components/ui/layout.tsx"
import type { MetaFunction } from "@remix-run/node"
import { BGDots } from "~/components/ui/bg-dots.tsx"
import { motion } from "framer-motion"
import clsxm from "~/utils/clsxm.tsx"

export const meta: MetaFunction = () => {
  return [
    { title: "RDev." },
    { name: "description", content: "Welcome to RDev!" },
  ]
}

export default function IndexPage() {
  return (
    <>
      <MainSection />
      <AboutSection />
      <ProjectSection />
      <BlogSection />
    </>
  )
}

function MainSection() {
  return (
    <Section className="md:h-screen h-[700px]">
      <BGDots />
      {/* TITLE MOBILE */}
      <div className="md:hidden xs:text-6xl text-4xl font-semibold flex h-full justify-center flex-col">
        <div>HEY</div>
        <div>IAM</div>
        <div>RIZQY</div>
        <div className="text-slate-500 text-xl mt-4">Fullstack Engineer</div>
      </div>
      {/* TITLE LARGE */}
      <div className="hidden relative md:flex font-sans items-center justify-center h-screen flex-col gap-2 mx-auto">
        <div className="w-full pointer-events-none aspect-w-1 aspect-h-1 absolute rounded-full custom-gradient" />
        <div className="text-[13vw] lg:text-[180px] absolute">
          <div className="flex justify-between leading-[.9em] font-semibold tracking-tight items-center">
            <span className="">HI</span>
            <span className="text-[8vw] lg:text-[110px]">👋🏼</span>
            <span className="text-right">THERE</span>
          </div>
          <div className="text-lg flex gap-4 justify-between w-full px-2">
            <h1>RIZQY PRASTYA ARI NUGROHO</h1>
            <h1>FULLSTACK ENGINEER</h1>
          </div>
          <div className="flex justify-between leading-[.8em] font-semibold tracking-tight items-center">
            <span className="">I</span>
            <span className="">AM</span>
            <span className="text-right">RIZQY</span>
          </div>
        </div>
        <div className="mt-auto pb-8 flex justify-between w-full items-center">
          <div>
            <p className="whitespace-nowrap text-gray-400">
              Based in Kudus, Central Java
            </p>
            <p className="text-lg font-semibold">Indonesia</p>
          </div>
          <div className="text-gray-400">(scroll)</div>
          <div className="flex flex-wrap min-w-min w-min items-center">
            <p className="whitespace-nowrap text-gray-400">
              Freelance Availibility
            </p>
            <div className="w-2 h-[1.2em] bg-green-400 rounded-full mr-2" />
            <p className="text-lg font-semibold">OPEN</p>
          </div>
        </div>
      </div>
    </Section>
  )
}

function AboutSection() {
  return (
    <Section className="mt-16">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p>SERVICES</p>
          <p>MORE ABOUT ME</p>
        </div>
        <hr className="border mt-4 border-white w-full" />
      </div>
      <div className="flex flex-col lg:text-[100px] md:text-[80px] sm:text-[50px] text-[35px] leading-[.8em] md:gap-8 gap-4 py-8">
        <div>
          <p>CREATIVE</p>
          <p>DEVELOPMENT</p>
        </div>
        <div className="text-right">
          <p>FRONTEND</p>
          <p>DEVELOPMENT</p>
        </div>
        <div>
          <p>BACKEND</p>
          <p>DEVELOPMENT</p>
        </div>
        <div className="text-right">
          <p>CLOUD</p>
          <p>ENGINEERING</p>
        </div>
      </div>
    </Section>
  )
}

function ProjectSection() {
  return (
    <Section className="mt-16">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p>PROJECTS</p>
          <p>2022 - 2024</p>
        </div>
        <hr className="border mt-4 border-white w-full" />
      </div>
      <div className="grid md:grid-cols-2 grid-cols-1 my-16 gap-4 relative">
        <ProjectPreview />
        <ProjectPreview />
        <ProjectPreview />
        <ProjectPreview />
      </div>
    </Section>
  )
}

function ProjectPreview() {
  return (
    <motion.div initial="initial" whileHover="focus">
      <motion.div
        variants={{
          initial: { padding: "0.5rem" },
          focus: { padding: "0rem" },
        }}
        className="border border-white/10 rounded-2xl w-full p-2"
      >
        <div className="border border-white/10 rounded-xl aspect-w-1 aspect-h-1 overflow-hidden relative">
          <motion.img
            src="/static/test-project.png"
            alt="test-project"
            title="test-project"
            className="w-full absolute"
            variants={{
              initial: {
                filter: "grayscale(100%)",
                scale: 1.8,
                rotate: "35deg",
              },
              focus: {
                filter: "grayscale(0%)",
                scale: [1.6, 1.4, 1.2],
                rotate: "0deg",
              },
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>
      <motion.div
        className="pl-2"
        animate="show"
        initial="initial"
        variants={{
          initial: {
            y: "100%",
            opacity: 0,
          },
          show: {
            y: "0%",
            opacity: 1,
          },
        }}
      >
        <p className="text-3xl">BLUPS ASIA</p>
        <p>(2023)</p>
      </motion.div>
    </motion.div>
  )
}

function BlogSection() {
  return (
    <Section className="py-16">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p>BLOGS</p>
          <p>SEE MORE</p>
        </div>
        <hr className="border mt-4 border-white w-full" />
      </div>
      <div className="grid md:grid-cols-2 mt-16 md:grid-rows-2 gap-4">
        <BlogCard featured />
        <BlogCard />
        <BlogCard />
      </div>
    </Section>
  )
}

function BlogCard(props: { featured?: boolean }) {
  const { featured = false } = props
  return (
    <div
      className={clsxm([
        featured && "md:row-span-2",
        !featured && "md:row-span-1 md:grid grid-cols-5 gap-2",
      ])}
    >
      <div
        className={clsxm([
          "overflow-hidden aspect-h-9 aspect-w-16",
          !featured && "md:rounded-br-3xl col-span-3",
          featured && "md:rounded-tl-3xl md:rounded-br-3xl",
        ])}
      >
        <motion.img
          src="/static/test-blog.png"
          alt="test-blog"
          title="test-blog"
          className="w-full absolute object-cover"
        />
      </div>
      <div className={clsxm([featured && "", !featured && "col-span-2"])}>
        <p
          className={clsxm([
            "text-2xl font-semibold",
            !featured && "mt-4 md:mt-0 md:text-lg",
            featured && "mt-4",
          ])}
        >
          Create React App
        </p>
        <p
          className={clsxm([
            "mt-2",
            featured && "",
            !featured && "md:text-sm md:mt-1",
          ])}
        >
          December 12, 2023
        </p>
      </div>
    </div>
  )
}
