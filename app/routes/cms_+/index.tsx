import { LoaderFunctionArgs, json } from "@remix-run/node"
import { Link, useLoaderData } from "@remix-run/react"
import { Button } from "~/components/ui/button.tsx"
import { blogList } from "~/services/blog/api.ts"

export async function loader({}: LoaderFunctionArgs) {
  return json({
    blogs: await blogList(),
  })
}

export default function () {
  const loaderData = useLoaderData<typeof loader>()

  const { blogs } = loaderData

  return (
    <div className="mt-14 flex flex-col gap-4">
      {blogs.map((x) => {
        return (
          <article
            key={x.id}
            className="border border-white rounded-md px-4 py-3"
          >
            <p>{x.title}</p>
            <p>{x.slug}</p>

            <Link to={`/cms/edit?id=${x.id}`}>
              <Button>Edit</Button>
            </Link>
          </article>
        )
      })}
    </div>
  )
}
