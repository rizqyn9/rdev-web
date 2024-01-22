import { Section } from "~/components/ui/layout.tsx"
import { json, type MetaFunction } from "@remix-run/node"
import { BGDots } from "~/components/ui/bg-dots.tsx"
import { motion } from "framer-motion"
import clsxm from "~/utils/clsxm.tsx"
import { LightStick } from "~/components/ui/light-stick.tsx"
import { Link, useLoaderData } from "@remix-run/react"
import { blogList } from "~/services/blog/api/list.ts"

export async function loader() {
  const [blogs, featuredBlogs] = await Promise.all([
    blogList({ isFeatured: false }),
    blogList({ isFeatured: true }),
  ])

  return json({ blogs, featuredBlogs })
}

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

        <a
          href="/resume-rizqy-prastya-ari-nugoroho.pdf"
          download
          className="underline !text-base mt-8 uppercase underline-offset-4 hover:underline-offset-8 block w-min whitespace-nowrap cursor-pointer transition-all duration-300"
        >
          Get My Resume
        </a>
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
          <a
            href="/resume-rizqy-prastya-ari-nugoroho.pdf"
            download
            className="underline !text-base mt-8 uppercase underline-offset-4 hover:underline-offset-8 block w-min whitespace-nowrap cursor-pointer transition-all duration-300"
          >
            Get My Resume
          </a>
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
          <Link
            to="about"
            className="hover:underline underline-offset-2 focus-ring rounded-sm"
          >
            MORE ABOUT ME
          </Link>
        </div>
        <LightStick direction="x" className="mt-4" />
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
        <LightStick direction="x" className="mt-4" />
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
  const loaderData = useLoaderData<typeof loader>()
  const { blogs, featuredBlogs } = loaderData

  const featured = featuredBlogs[0]

  return (
    <Section className="py-16">
      <div className="w-full">
        <div className="flex items-center justify-between">
          <p>BLOGS</p>
          <Link
            prefetch="intent"
            to="/blog"
            className="hover:underline underline-offset-2 focus-ring rounded-sm"
          >
            SEE MORE
          </Link>
        </div>
        <LightStick direction="x" className="mt-4" />
      </div>
      <div className="grid md:grid-cols-2 mt-16 md:grid-rows-2 gap-8 md:gap-2">
        {featured && (
          <BlogCard
            featured
            slug={featured.slug}
            banner={featured.banner.url}
            title={featured.title}
            createdAt={featured.date.full}
          />
        )}
        {blogs.map((blog) => (
          <BlogCard
            key={blog.slug}
            slug={blog.slug}
            banner={blog.banner.url}
            title={blog.title}
            createdAt={blog.date.full}
          />
        ))}
      </div>
    </Section>
  )
}

function BlogCard(props: {
  featured?: boolean
  slug: string
  banner: string
  title: string
  createdAt: string
}) {
  const { featured = false, slug, banner, title, createdAt } = props
  return (
    <Link
      to={`/blog/${slug}`}
      className={clsxm([
        "group",
        featured && "md:row-span-2",
        !featured && "md:row-span-1 md:grid grid-cols-5 gap-2",
      ])}
    >
      <div
        className={clsxm([
          "overflow-hidden aspect-h-9 aspect-w-16 focus-ring border border-white/30 shadow-lg shadow-white/10",
          !featured && "md:rounded-br-3xl col-span-3",
          featured && "md:rounded-tl-3xl md:rounded-br-3xl",
        ])}
      >
        <motion.img
          src={banner}
          alt={title}
          title={title}
          className="w-full absolute object-cover"
        />
      </div>
      <div className={clsxm([featured && "", !featured && "col-span-2"])}>
        <p
          className={clsxm([
            "text-lg font-semibold group-hover:underline underline-offset-2",
            !featured &&
              "mt-4 md:mt-0 md:text-lg md:line-clamp-2 lg:line-clamp-4",
            featured && "mt-4 md:text-2xl",
          ])}
        >
          {title}
        </p>
        <p
          className={clsxm([
            "mt-2 italic",
            featured && "",
            !featured && "md:text-sm",
          ])}
        >
          {createdAt}
        </p>
      </div>
    </Link>
  )
}
