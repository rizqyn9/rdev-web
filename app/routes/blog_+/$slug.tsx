import {
  HeadersFunction,
  LoaderFunctionArgs,
  MetaFunction,
  json,
} from "@remix-run/node"
import { useLoaderData, useParams } from "@remix-run/react"
import { useMdxComponent } from "~/utils/mdx.tsx"
import { ButtonBack } from "~/components/ui/button.tsx"
// import { dateFormatEn } from "../../utils/date.ts"
import { Section } from "~/components/ui/layout.tsx"
import { reuseUsefulLoaderHeaders } from "~/utils/headers.server.ts"
import { getSocialMetas } from "~/utils/seo.ts"
import { RootLoaderType } from "~/root.tsx"
import { getUrl } from "~/utils/misc.ts"
import { findBlogBySlug } from "~/utils/blog/blog.server.ts"
import { ContentHeader } from "~/components/ui/post/header.tsx"
import { useCallback, useRef } from "react"
import { useOnRead } from "~/components/hook/use-on-read.ts"

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
    createdAt,
    timeToRead,
  } = await findBlogBySlug(slug)

  return json({
    banner,
    title,
    page: {
      timeToRead,
      code,
      like,
      view,
      headings,
    },
    categories,
    publish: {
      avatar: author.avatar,
      name: author.name,
      at: createdAt,
      initial: "RN",
    },
    createdAt,
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

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const { page, title, publish, banner } = loaderData

  const params = useParams()
  const { slug } = params
  const readMarker = useRef<HTMLDivElement>(null)

  const Component = useMdxComponent(page.code.code)

  useOnRead({
    parentElRef: readMarker,
    time: page.timeToRead,
    onRead: useCallback(() => {
      // if (isDraft) return
      // if (slug) void markAsRead({slug})
      console.log("Mark as read: ", slug)
    }, [slug]),
  })

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
      <Section className="grid">
        {/* <div className="mdx prose w-full max-w-none md:col-span-5 col-span-full"> */}
        <div
          className="mdx prose w-full max-w-none overflow-auto"
          ref={readMarker}
        >
          <Component />
        </div>
        {/* </div> */}
        {/* <div className="md:col-span-2 overflow-hidden max-w-full">
          <PostToc headings={page.headings} />
        </div> */}
      </Section>
    </>
  )
}
