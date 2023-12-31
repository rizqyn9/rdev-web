import { MetaFunction, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { CardBlog } from "~/components/ui/card-blog.tsx"
import { Layout, Section } from "~/components/ui/layout.tsx"
import { H3 } from "~/components/ui/typography.tsx"
import { blogList } from "~/services/blog/api/list.ts"
import { getBlogUrl } from "~/utils/blog/blog.tsx"

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

export const meta: MetaFunction = () => {
  return [{ title: "RDev | Blog" }]
}
export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const { blogs, featuredBlogs } = loaderData

  return (
    <Layout className="flex flex-col gap-4">
      <Section>
        <p className="text-center md:px-16 py-16 text-2xl font-semibold leading-relaxed text-slate-300">
          Greetings 🙋, fellow developers, and coding enthusiasts! I'm Rizqy,
          the architect behind the keystrokes and lines of code you're about to
          explore here at{" "}
          <Link
            to="/"
            className="underline underline-offset-4 font-bold text-slate-50"
          >
            rdev-hub.com
          </Link>
          . This digital space is my playground, where technology meets
          creativity, and I'm thrilled to have you join me on this coding
          expedition.
        </p>
      </Section>
      <Section>
        <H3 className="col-span-full mb-5">Featured Post</H3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-4">
          {featuredBlogs.map((blog) => (
            <CardBlog
              type="featured"
              to={getBlogUrl({ slug: blog.slug })}
              key={blog.id}
              className="col-span-full"
              {...blog}
            />
          ))}
        </div>
      </Section>
      <Section>
        <H3 className="mb-5">Post</H3>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-20 lg:mb-40">
          {blogs.map((blog, idx) => (
            <CardBlog
              type="general"
              key={idx}
              to={getBlogUrl({ slug: blog.slug })}
              {...blog}
            />
          ))}
        </div>
      </Section>
    </Layout>
  )
}
