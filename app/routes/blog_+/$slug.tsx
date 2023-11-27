import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useEffect, useState } from "react"
import { Tags } from "~/components/ui/tag/index.tsx"
import { compileMdx } from "~/utils/compile-mdx.server.ts"
import { useMdxComponent } from "~/utils/mdx.tsx"

const MOCK = {
  title: "Test",
  createdAt: new Date().toISOString(),
  like: 100,
  view: 2000,
  categories: ["React", "NodeJs"].map((x) => ({ text: x })),
  banner: {
    src: "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  html: `
  # Test
  ## Hai

  <a href="https://google.com">Test</a>
  ---
  `.trim(),
}

export async function loader({}) {
  const code = await compileMdx(MOCK.html)
  return json({
    banner: MOCK.banner,
    title: MOCK.title,
    page: {
      code,
      like: MOCK.like,
      view: MOCK.view,
    },
    categories: MOCK.categories,
    createdAt: MOCK.createdAt,
    createdBy: "Rizqy Prastya Ari Nugroho",
  })
}

export default function BlogPage() {
  const { page, categories, banner, title, createdAt, createdBy } =
    useLoaderData<typeof loader>()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, setToc] = useState<string[]>([])

  useEffect(() => {
    const headings = document.querySelectorAll(".mdx h1, .mdx h2, .mdx h3")
    const toc: string[] = []
    headings.forEach((x) => {
      toc.push(x.id)
    })
    setToc(toc)
  }, [])

  const Component = useMdxComponent(page.code.code)

  return (
    <div className="relative mx-10vw">
      {/* Back */}
      <div className="py-5">
        <button className="">{"<  Back to home"}</button>
      </div>
      {/* Title */}
      <div className="flex flex-col py-8">
        <h2 className="text-2xl font-bold">{title}</h2>
        <h2 className="text-lg font-bold text-gray-600">
          {new Date(createdAt).toLocaleDateString()} - {createdBy}
        </h2>
      </div>
      {/* Banner */}
      <div className="aspect-h-4 aspect-w-3 md:aspect-h-1 md:aspect-w-3 rounded-lg overflow-hidden mb-5">
        <img
          className="focus-ring w-full rounded-lg object-cover object-center transition"
          alt="banner"
          src={banner.src}
        />
      </div>
      <Tags list={categories} className="gap-4 my-5" />
      <div className="mdx prose">
        <Component />
      </div>
    </div>
  )
}
