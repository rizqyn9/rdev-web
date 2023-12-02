import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Tags } from "~/components/ui/tag/index.tsx"
import { compileMdx } from "~/utils/compile-mdx.server.ts"
import { useMdxComponent } from "~/utils/mdx.tsx"
import fs from "fs-extra"
import { ButtonBack } from "~/components/ui/button.tsx"
import { Grid } from "~/components/ui/grid.tsx"

const MOCK = {
  title: "The Jokers in a Deck of cards - on the ever-evolving Generalist Role",
  createdAt: new Date().toISOString(),
  like: 100,
  view: 2000,
  categories: ["React", "NodeJs"].map((x) => ({ text: x })),
  banner: {
    title: "Photo",
    src: "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
  html: `
  # Test
  ## Hai
  
  <pre>aasdwasd</pre>

  <a href="https://google.com">Test</a>
  ---
  `.trim(),
}

export async function loader({}) {
  const a = await fs.readFile(process.cwd() + "/test.mdx", "utf-8")
  const code = await compileMdx(a)
  // console.log(code.matter)
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

  const Component = useMdxComponent(page.code.code)

  return (
    <div className="relative mx-auto mt-20 col-span-full max-w-xl">
      <ButtonBack to="/blog" />
      {/* Title */}
      <Grid as="header" className="mt-5 gap-y-5">
        <h2 className="text-2xl col-span-full font-bold">{title}</h2>
        <div className="col-span-full text-white/70">
          <p>Written on September 02, 2021</p>
        </div>
        <div className="overflow-hidden col-span-full aspect-w-10 aspect-h-4 w-full">
          <img
            className="overflow-hidden rounded-lg object-cover object-center"
            alt="banner"
            src={banner.src}
            title={banner.title}
            crossOrigin="anonymous"
          />
        </div>
      </Grid>
      <Tags list={categories} className="gap-4 my-5" />
      <div className="mdx prose w-full max-w-none">
        <Component />
      </div>
    </div>
  )
}
