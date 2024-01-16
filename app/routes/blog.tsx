import { BlogCard, BlogFeaturedCard } from "~/components/ui/blog-card.tsx"
import { MetaFunction, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Section } from "~/components/ui/layout.tsx"
import { H3 } from "~/components/ui/typography.tsx"
import { blogList } from "~/services/blog/api/list.ts"
import { BGDots } from "~/components/ui/bg-dots.tsx"

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
export default function BlogPage() {
  const loaderData = useLoaderData<typeof loader>()
  const { blogs, featuredBlogs } = loaderData

  return (
    <>
      <BGDots />
      <Section className="">
        <div className="lg:mx-44 md:mx-24 sm:mx-8 mx-4 my-56">
          <p className="text-center text-2xl md:text-4xl font-semibold leading-relaxed text-gray-300">
            Greetings 🙋, fellow developers, and coding enthusiasts! I'm Rizqy,
            the architect behind the keystrokes and lines of code you're about
            to explore here at{" "}
            <Link
              to="/"
              className="underline italic underline-offset-4 font-bold text-slate-50"
            >
              <span>rdev.space</span>
            </Link>
            . This digital space is my playground, where technology meets
            creativity, and I'm thrilled to have you join me on this coding
            expedition.
          </p>
        </div>
      </Section>
      <Section>
        <H3 className="text-2xl font-semibold">FEATURED</H3>
        <div className="h-[2px] w-full bg-white mb-8 mt-2" />
        {featuredBlogs.map((blog) => (
          <BlogFeaturedCard
            key={blog.slug}
            slug={blog.slug}
            banner={blog.banner.url}
            author={{
              avatar: blog.author.avatar,
              name: blog.author.name,
            }}
            title={blog.title}
            desc={blog.desc}
            createdAt={blog.date.full}
          />
        ))}
      </Section>
      <Section className="pt-16">
        <H3 className="text-2xl font-semibold">WRITING</H3>
        <div className="h-[2px] w-full bg-white mb-5 mt-2" />
        <div className="grid md:grid-cols-2 gap-6 mb-20 lg:mb-40 mt-8">
          {blogs.map((blog) => (
            <BlogCard
              key={blog.slug}
              slug={blog.slug}
              title={blog.title}
              createdAt={blog.date.full}
              banner={blog.banner.url}
            />
          ))}
        </div>
      </Section>
    </>
  )
}
