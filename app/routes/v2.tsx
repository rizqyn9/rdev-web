import clsxm from "~/utils/clsxm.tsx"
import { motion } from "framer-motion"
import React from "react"
import { Section } from "~/components/ui/layout.tsx"
import { Link } from "@remix-run/react"

const SITEMAP = [
  { name: "HOME", to: "/" },
  { name: "BLOG", to: "/blog" },
  { name: "ABOUT ME", to: "/about-me" },
  { name: "CONTACT", to: "/contact" },
]

export default function NewPage() {
  return (
    <>
      <Header />
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
      <Section className="py-16">
        <hr className="border border-white" />
        <div className="grid grid-cols-5 gap-4 mt-8">
          <div>
            <p>SITEMAP</p>
            <ul className="mt-2 text-gray-400">
              {SITEMAP.map((site) => (
                <li key={site.to}>
                  <Link to={site.to}>{site.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p>SOCIALS</p>
            <ul className="mt-2 text-gray-400">
              {["INSTAGRAM", "GITHUB", "GMAIL"].map((site) => (
                <li key={site}>{site}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      {/* <MainSection /> */}
    </>
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

function Grid(props: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={clsxm([
        "grid relative grid-cols-12 gap-5 container mx-auto",
        props.className,
      ])}
    >
      {props.children}
    </div>
  )
}

function BGDots(props: { className?: string }) {
  const { className } = props
  return (
    <div
      className={clsxm(["pointer-events-none absolute inset-0", className])}
      style={{
        backgroundPosition: "center",
        backgroundSize: "35px 35px",
        backgroundImage: "radial-gradient(white 1px, transparent 0)",
        opacity: 0.4,
      }}
    />
  )
}

export function Header() {
  return (
    <header className="py-4 fixed inset-0 bottom-auto z-50">
      <Section className="flex justify-between items-center">
        <Logo />
        <Nav />
      </Section>
    </header>
  )
}

function Logo() {
  return (
    <div className="flex font-bold text-2xl relative max-w-min">
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
    </div>
  )
}

const NAV = [
  { title: "HOME" },
  { title: "BLOG" },
  { title: "ABOUT ME" },
  { title: "CONTACT" },
]

function Nav() {
  return (
    <ul className="sm:flex hidden gap-4">
      {NAV.map((nav) => (
        <li key={nav.title}>{nav.title}</li>
      ))}
    </ul>
  )
}

export function MainSection() {
  return (
    <Section className="relative h-screen">
      <BGDots />
      <motion.div
        animate={{ scale: 1 }}
        style={{ scale: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="grid place-content-center absolute inset-0 leading-none min-h-screen text-[10vw] font-semibold col-span-full"
      >
        <div className="w-full pointer-events-none aspect-w-1 aspect-h-1 absolute rounded-full custom-gradient" />
        <h1 className="overflow-hidden flex justify-between gap-4 items-center">
          <motion.span
            style={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, ease: "backOut" }}
            className="block"
          >
            HI
          </motion.span>
          <motion.span
            className="text-[6vw]"
            initial="hide"
            animate="show"
            whileTap={"hover"}
            variants={{
              hide: { opacity: 0 },
              show: { opacity: 1, rotateZ: "0deg" },
              hover: {
                rotateZ: ["0deg", "90deg", "0deg"],
                transition: { duration: 1, delay: 0, repeat: Infinity },
              },
            }}
            transition={{ duration: 0.5, ease: "easeIn", delay: 0.4 }}
          >
            👋🏼
          </motion.span>
          <motion.span
            style={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.2, ease: "backOut" }}
            className="text-right"
          >
            THERE
          </motion.span>
        </h1>
        <div className="flex justify-between text-[1vw] px-[.5vw]">
          <motion.h1
            style={{ opacity: 0, letterSpacing: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.4 }}
          >
            RIZQY PRASTYA ARI NUGROHO
          </motion.h1>
          <motion.h1
            style={{ opacity: 0, letterSpacing: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeInOut", delay: 0.6 }}
          >
            FULLSTACK ENGINEER
          </motion.h1>
        </div>
        <h1 className="overflow-hidden flex justify-between gap-4">
          <motion.span
            style={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.3, ease: "backOut" }}
          >
            I
          </motion.span>
          <motion.span
            style={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.4, ease: "backOut" }}
          >
            AM
          </motion.span>
          <motion.span
            style={{ y: "100%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 0.5, delay: 0.5, ease: "backOut" }}
          >
            RIZQY
          </motion.span>
        </h1>
      </motion.div>
      <motion.div
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
        className="mt-auto hidden md:grid px-4 py-8 grid-cols-3 col-span-full items-center"
      >
        <div className="">
          <p className="text-[#838383]">Based in Kudus, Central Java</p>
          <p className="text-xl font-semibold">Indonesia</p>
        </div>
        <p className="text-center">Scroll</p>
        <div className="ml-auto w-fit max-w-min flex flex-wrap whitespace-nowrap items-center">
          <p className="text-[#838383]">Freelance Availibility</p>
          <div className="w-2 h-4 rounded-full bg-green-500" />
          <p className="ml-2 font-semibold">OPEN</p>
        </div>
      </motion.div>
    </Section>
  )
}

export function SecondSection() {
  return (
    <Grid className="text-[9vw] py-8 leading-[.7em] gap-4">
      <p className="col-span-full">SPECIALIZED</p>
      <p className="col-span-full text-right">IN WEBSITE</p>
      <p className="col-span-full text-center">DEVELOPMENT</p>
      <p className="col-span-full">AND CLOUD</p>
      <div className="col-span-full text-right flex max-h-min">
        <p className="text-[1.5vw] self-end leading-normal text-left">
          MY CREATIVE DELIVERABLES ARE MADE IN REACT ECOSYSTEM.
        </p>
        <p className="max-h-min">ARCHITECTURE</p>
      </div>
    </Grid>
  )
}

export function ProjectCard() {
  return (
    <motion.div
      whileHover="focus"
      initial={"initial"}
      className="border w-full h-[40rem] aspect-w-1 aspect-h-2 gap-2 z-50 flex flex-col bg-[#262626]/20 backdrop-blur-sm lg:col-span-3 md:col-span-6 col-span-full border-white/10 rounded-xl p-2"
    >
      <motion.div
        className="border rounded-lg flex justify-between p-3 border-inherit font-thin font-montserrat italic"
        variants={{
          initial: {
            background: "rgba(3, 158, 239, 0)",
          },
          focus: {
            background: "rgba(3, 158, 239, 1)",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <p>BLUPS ASIA</p>
        <p>2023</p>
      </motion.div>
      <motion.div
        className="border relative flex-1 rounded-lg border-inherit overflow-hidden"
        variants={{
          initial: {
            background: "rgba(3, 158, 239, 0)",
          },
          focus: {
            background: "rgba(3, 158, 239, 1)",
          },
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <motion.div
          className="w-full"
          style={{
            y: "15%",
          }}
          variants={{
            initial: {
              filter: `grayscale(100%)`,
              scale: 2,
              rotateZ: "45deg",
            },
            focus: {
              filter: `grayscale(0%)`,
              scale: 1,
              rotateZ: "0deg",
            },
          }}
          transition={{
            duration: 0.4,
            ease: "easeInOut",
          }}
        >
          <img
            src="/static/test-project.png"
            alt="test-project"
            title="test-project"
            className="w-full object-cover object-center"
          />
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
