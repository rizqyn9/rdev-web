import { Link } from "@remix-run/react"
import { BlogPreview } from "~/services/blog/schema.ts"
import { Icon } from "./icon.tsx"
import clsxm from "~/utils/clsxm.tsx"

type CardType = "general" | "featured"

type CardBlogProps = {
  to: string
  tags: string[]
  title: string
  type: CardType
} & BlogPreview &
  JSX.IntrinsicElements["article"]

export function CardBlog(props: CardBlogProps) {
  const {
    to,
    tags,
    title,
    desc,
    date,
    author,
    banner,
    className,
    type = "general",
    ...rest
  } = props

  return (
    <article
      className={clsxm(
        "grid w-full border",
        "group overflow-hidden relative rounded-md border-white/10 shadow-inner bg-slate-900",
        "hover:bg-slate-800 hover:shadow-transparent",
        "transition-all duration-500",
        type === "general" && "grid-cols-1 grid-rows-card-container",
        type === "featured" && "md:grid-cols-2 md:gap-8 md:p-4",
        className
      )}
      {...rest}
    >
      {/* Image */}
      <Image
        alt={title}
        className={clsxm(
          "object-cover aspect-w-6 aspect-h-3",
          type === "general" && "row-span-2",
          type === "featured" &&
            "md:aspect-w-4 md:aspect-h-2 md:order-3 md:rounded-md md:shadow-lg shadow-white"
        )}
        title={banner.title}
        src={banner.url}
      />

      {/* Content */}
      <div
        className={clsxm(
          "grid grid-cols-1 gap-3 p-4",
          type == "general" && "row-span-2 grid-rows-card-preview",
          type == "featured" && "md:p-2 md:gap-y-6"
        )}
      >
        {/* <Tags tags={tags} /> */}
        <div
          className={clsxm(
            "grid grid-cols-2 justify-center items-center text-xs",
            type == "general" && "",
            type == "featured" && "text-base"
          )}
        >
          <button className="flex items-center gap-2">
            <div
              className={clsxm(
                "bg-slate-500 rounded-full h-8 w-8 overflow-hidden flex-shrink-0",
                type === "general" && "",
                type === "featured" && "md:h-10 md:w-10 md:mr-2"
              )}
            >
              <img src={author.avatar} alt={author.name} title={author.name} />
            </div>
            <p className="truncate overflow-hidden">{author.name}</p>
          </button>
          <p className="text-right truncate">{date.raw}</p>
        </div>
        <h2
          className={clsxm(
            "font-bold text-xl md:text-lg h-max line-clamp-2 leading-7"
          )}
        >
          {title}
        </h2>
        <p className="text-slate-400 md:text-sm h-max line-clamp-2 leading-5">
          {desc}
        </p>
        <div className="mt-auto ml-auto md:ml-0">
          <ButtonGoTo
            to={to}
            className={clsxm("md:text-lg", type == "featured" && "md:text-lg")}
          />
        </div>
      </div>
    </article>
  )
}

type ImageProps = {} & JSX.IntrinsicElements["img"]
export function Image(props: ImageProps) {
  const { className, ...rest } = props
  return (
    <div className={clsxm("overflow-hidden bg-red-300", className)}>
      {/* eslint-disable-next-line jsx-a11y/alt-text */}
      <img className={clsxm("object-cover")} {...rest} />
    </div>
  )
}

type ButtonBackProps = {
  to: string
  className?: string
}

export function ButtonGoTo(props: ButtonBackProps) {
  const { to, className } = props
  return (
    <Link
      className={clsxm(
        "text-red-300 whitespace-nowrap w-min group/link text-xl font-bold flex gap-2 transition-all duration-500 hover:underline hover:underline-offset-4",
        className
      )}
      to={to}
    >
      <span>Read on</span>
      <Icon
        name="arrow-right"
        className="group-hover/link:translate-x-2 group-hover/link:scale-150 group-hover/link:translate-y-1 group-hover/link:-rotate-45 transition duration-700"
      />
    </Link>
  )
}

type TagsProps = {
  tags: string[]
}

export function Tags(props: TagsProps) {
  const { tags } = props
  return (
    <div
      className={clsxm([
        "relative max-w-full bg-inherit",
        "before:content-[''] before:inset-y-0 before:absolute before:left-0 before:w-5",
        "after:content-[''] after:inset-y-0 after:absolute after:right-0 after:w-5",
        "before:bg-gradient-to-r from-slate-900 group-hover:from-slate-800 to-transparent after:bg-gradient-to-l transition-all duration-500",
      ])}
    >
      <div
        className={clsxm([
          "flex",
          "gap-1 px-3",
          "overflow-x-scroll scrollbar-none ",
        ])}
      >
        {tags.map((x) => (
          <button
            className="text-xs border rounded-full border-white px-2 py-1"
            key={x}
          >
            {x}
          </button>
        ))}
      </div>
    </div>
  )
}
