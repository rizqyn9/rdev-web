import { HeadersFunction, MetaFunction, json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { Tags } from "~/components/ui/tag/index.tsx"
import { compileMdx } from "~/utils/compile-mdx.server.ts"
import { useMdxComponent } from "~/utils/mdx.tsx"
import fs from "fs-extra"
import { ButtonBack } from "~/components/ui/button.tsx"
import { Grid } from "~/components/ui/grid.tsx"
import { dateFormatEn } from "../../utils/date.ts"
import { Section } from "~/components/ui/layout.tsx"
import { reuseUsefulLoaderHeaders } from "~/utils/headers.server.ts"
import { getSocialMetas } from "~/utils/seo.ts"
import { RootLoaderType } from "~/root.tsx"
import { getUrl } from "~/utils/misc.ts"

const MOCK = {
  title:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita, provident.",
  createdAt: dateFormatEn(new Date(), "full"),
  like: 100,
  view: 2000,
  categories: ["React", "NodeJs"].map((x) => ({ text: x })),
  banner: {
    title: "Photo",
    src: "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
  },
}

export async function loader() {
  const a = await fs.readFile(process.cwd() + "/test.mdx", "utf-8")
  const { code, headings } = await compileMdx(a)

  return json({
    banner: MOCK.banner,
    title: MOCK.title,
    page: {
      code,
      like: MOCK.like,
      view: MOCK.view,
      headings,
    },
    categories: MOCK.categories,
    createdAt: MOCK.createdAt,
    createdBy: "Rizqy Prastya Ari Nugroho",
  })
}

export const headers: HeadersFunction = reuseUsefulLoaderHeaders

export const meta: MetaFunction<typeof loader, { root: RootLoaderType }> = ({
  data,
  matches,
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo
  if (!data)
    return [
      { title: "Not found" },
      { description: "You landed on a page that could not find 😢" },
    ]

  return [
    ...getSocialMetas({
      url: getUrl(requestInfo),
      title: data.title,
    }),
  ]
}

export default function BlogPage() {
  const loaderData = useLoaderData<typeof loader>()

  const { page, categories, banner, title, createdAt } = loaderData

  const Component = useMdxComponent(page.code.code)

  return (
    <Section>
      <ButtonBack to="/blog" />
      {/* Title */}
      <Grid as="header" className="mt-5 gap-y-5">
        <h2 className="text-2xl col-span-full font-bold">{title}</h2>
        <div className="col-span-full text-white/70">
          <p>Written on {createdAt}</p>
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
    </Section>
  )
}
