import { Link } from "@remix-run/react"

type PostTocProps = {
  headings: {
    id: number
    slug: string
    title: string
    level: number
  }[]
}

export function PostToc(props: PostTocProps) {
  const { headings } = props

  return (
    <aside className="flex flex-col gap-2">
      {headings.map((heading) => (
        <TocLink {...heading} key={heading.id} />
      ))}
    </aside>
  )
}

const PADDING = {
  "2": 0,
  "3": 1,
  default: 0,
} satisfies Record<string | "default", number>

function TocLink(props: PostTocProps["headings"][number]) {
  const { title, slug, level } = props
  const paddingLeft =
    PADDING[String(level) as keyof typeof PADDING] ?? PADDING["default"]

  return (
    <Link
      style={{
        paddingLeft: `${paddingLeft}rem`,
      }}
      to={`#${slug}`}
    >
      {title}
    </Link>
  )
}
