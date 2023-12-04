import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Icon } from "~/components/ui/icon.tsx"
import { Layout } from "~/components/ui/layout.tsx"
import { blogList } from "~/services/blog/api.ts"
import { BlogPreview } from "~/services/blog/schema.ts"
import clsxm from "~/utils/clsxm.tsx"

export async function loader() {
  const [blogs, featuredBlogs] = await Promise.all([
    blogList({ isFeatured: false }),
    blogList({ isFeatured: true }),
  ])

  return json({
    blogs,
    featuredBlogs,
  })
}

function getBlogDetailsUrl(to: string) {
  return `/blog/${to}`
}

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const { blogs, featuredBlogs } = loaderData

  return (
    <Layout>
      <div className="mb-5 flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Featured Post</h2>
        {featuredBlogs.map((blog) => (
          <CardPost isFeatured to="/blog/test" key={blog.id} {...blog} />
        ))}
      </div>
      <h2 className="text-4xl font-bold">Featured Post</h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-20 lg:mb-40">
        {blogs.map((x, idx) => (
          <CardPost key={idx} to={getBlogDetailsUrl("test")} {...x} />
        ))}
      </div>
    </Layout>
  )
}

type CardPostProps = {
  isFeatured?: boolean
  to: string
  tags: string[]
  title: string
} & BlogPreview

function CardPost(props: CardPostProps) {
  const {
    isFeatured = false,
    to,
    tags,
    title,
    desc,
    date,
    author,
    banner,
  } = props
  return (
    <article
      className={clsxm(
        "group",
        "border p-3 relative rounded-md w-full border-white/10 hover:bg-slate-800 shadow-inner hover:shadow-transparent transition-all duration-500 bg-slate-900 grid gap-5 items-center grid-cols-1",
        isFeatured && "md:grid-cols-2 md:gap-12"
      )}
    >
      {/* Image */}
      <div
        className={clsxm(
          "rounded overflow-hidden shadow-md shadow-black max-w-full w-full aspect-w-5 aspect-h-3",
          isFeatured && "md:order-2"
        )}
      >
        <img alt={title} title={banner.title} src={banner.url} />
      </div>

      {/* Content */}
      <div
        className={clsxm(
          "flex px-4 py-2 w-full flex-col gap-4",
          isFeatured ? "order-0 justify-between py-2 h-full" : "flex-1"
        )}
      >
        {/* Container */}
        <div
          className={clsxm([
            "relative max-w-full bg-inherit",
            "before:content-[''] before:inset-y-0 before:absolute before:left-0 before:w-5",
            "after:content-[''] after:inset-y-0 after:absolute after:right-0 after:w-5",
            "before:bg-gradient-to-r from-slate-900 group-hover:from-slate-800 to-transparent after:bg-gradient-to-l transition-all duration-500",
          ])}
        >
          <div
            className={clsxm([
              "flex gap-1 px-3",
              "overflow-x-scroll scrollbar-none ",
            ])}
          >
            {tags.map((x) => (
              <button
                className="text-xs border rounded-full border-white px-2 py-1"
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 w-full items-center">
          <button className="flex items-center gap-2">
            <div className="bg-red-50 h-7 w-7 rounded-full overflow-hidden">
              <img src={author.avatar} alt={author.name} title={author.name} />
            </div>
            <p>{author.name}</p>
          </button>
          <hr className="flex-1 border" />
          <p>{date.raw}</p>
        </div>
        <h2 className={clsxm("font-bold", isFeatured ? "text-2xl" : "text-xl")}>
          {title}
        </h2>
        <p className="text-slate-400 text-sm">{desc}</p>
        <ButtonGoTo to={to} />
        {/* <Link
          to={to}
          className="text-link font-medium hover:underline text-red-200 hover:underline-offset-2 hover:cursor-pointer "
        >
          {"Read On ->"}
        </Link> */}
      </div>
    </article>
  )
}

type ButtonBackProps = {
  to: string
}

export function ButtonGoTo(props: ButtonBackProps) {
  const { to } = props
  return (
    <Link
      className="text-sm flex gap-2 transition duration-500 hover:underline hover:underline-offset-4"
      to={to}
    >
      <span>Read on</span>
      <Icon name="arrow-right" />
    </Link>
  )
}
