import { json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button.tsx"
import { Section } from "~/components/ui/layout.tsx"
import { blogList } from "~/services/blog/api/list.ts"

export async function loader() {
  return json({
    blogs: await blogList({}),
  })
}

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const { blogs } = loaderData

  return (
    <Section>
      <h2 className="text-xl font-bold mb-8">List</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((x) => {
          return (
            <article key={x.id} className="grid border grid-cols-2 gap-4 p-4">
              <div className="col-span-full w-full aspect-w-16 aspect-h-8">
                <img
                  alt={x.title}
                  className="object-cover"
                  src={x.banner.url}
                />
              </div>
              <div className="grid grid-cols-2 col-span-full">
                <div>
                  <p className="text-lg font-semibold">{x.title}</p>
                  <p>{x.slug}</p>
                </div>
                <div className="ml-auto my-auto">
                  <Link to={`/cms/edit?id=${x.id}`}>
                    <Button>Edit</Button>
                  </Link>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </Section>
  )
}
