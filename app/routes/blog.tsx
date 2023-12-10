import { MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
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
