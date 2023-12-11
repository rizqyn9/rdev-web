import {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { useMdxComponent } from "~/utils/mdx.tsx"
import { ButtonBack } from "~/components/ui/button.tsx"
import { dateFormatEn } from "../../utils/date.ts"
import { Section } from "~/components/ui/layout.tsx"
import { reuseUsefulLoaderHeaders } from "~/utils/headers.server.ts"
import { getSocialMetas } from "~/utils/seo.ts"
import { RootLoaderType } from "~/root.tsx"
import { getUrl } from "~/utils/misc.ts"
import { findBlogBySlug } from "~/utils/blog/blog.server.ts"
import { ContentHeader } from "~/components/ui/post/header.tsx"

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

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug as string

  const {
    code,
    headings,
    title,
    banner,
    like,
    view,
    categories,
    description,
    author,
  } = await findBlogBySlug(slug)

  return json({
    banner,
    title,
    page: {
      code,
      like,
      view,
      headings,
    },
    categories,
    publish: {
      avatar: author.avatar,
      name: author.name,
      at: MOCK.createdAt,
      initial: "RN",
    },
    createdAt: MOCK.createdAt,
    createdBy: "Rizqy Prastya Ari Nugroho",
    description,
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
      description:
        data.description ?? "You landed on a page that could not find 😢",
    }),
  ]
}

export default function BlogPage() {
  const loaderData = useLoaderData<typeof loader>()

  const { page, title, publish, banner } = loaderData

  const Component = useMdxComponent(page.code.code)

  return (
    <>
      <Section className="py-8">
        <ButtonBack to="/blog" />
      </Section>
      <ContentHeader
        banner={banner.src}
        publish={publish}
        readTime="3 minutes"
        title={title}
      />
      <Section>
        <div className="mdx prose w-full max-w-none">
          <Component />
        </div>
      </Section>
    </>
  )
}
