import { Link } from "@remix-run/react"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar.tsx"

type BlogFeaturedCardProps = {
  slug: string
  banner: string
  author: {
    avatar: string
    name: string
  }
  title: string
  desc: string
  createdAt: string
}

export function BlogFeaturedCard(props: BlogFeaturedCardProps) {
  const { banner, author, title, desc, createdAt, slug } = props

  return (
    <Link
      prefetch="intent"
      to={slug}
      className="border grid group backdrop-blur-sm bg-white/5 md:grid-cols-2 gap-2 lg:gap-4 border-white/20 rounded-tl-3xl rounded-br-3xl md:p-4 p-2"
    >
      <div className="aspect-w-16 aspect-h-10 rounded-tl-xl rounded-br-xl overflow-hidden border border-white/20 focus-ring shadow-lg shadow-gray-800">
        <img src={banner} title={title} alt={title} />
      </div>
      <div className="md:p-2 flex flex-col py-4 pr-2">
        <div className="flex gap-2 items-center self-start">
          <Avatar className="">
            <AvatarFallback className="bg-gray-800 text-sm">
              {author.name
                .split(" ")
                .map((x) => x[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
            <AvatarImage />
          </Avatar>
          <p>{author.name}</p>
        </div>
        <div className="md:my-auto my-6">
          <p className="text-xl line-clamp-2 lg:text-2xl font-semibold lg:line-clamp-3">
            {title}
          </p>
          <p className="line-clamp-2 text-lg mt-2 text-gray-400 lg:text-xl lg:line-clamp-3">
            {desc}
          </p>
        </div>
        <div className="self-end mt-auto text-gray-400">
          <p>{createdAt}</p>
        </div>
      </div>
    </Link>
  )
}

type BlogCardProps = {
  slug: string
  title: string
  createdAt: string
  banner: string
}

export function BlogCard(props: BlogCardProps) {
  const { slug, title, createdAt, banner } = props
  return (
    <Link to={`/blog/${slug}`} className="group" prefetch="intent">
      <div className="border border-white/20 overflow-hidden aspect-w-16 aspect-h-9 rounded-tl-2xl rounded-br-2xl focus-ring shadow-lg shadow-gray-800">
        <img
          src={banner}
          title={title}
          alt={title}
          className="w-full object-cover object-center"
        />
      </div>
      <div className="mt-4">
        <p className="text-xl line-clamp-3">{title}</p>
        <p className="text-sm text-gray-400 mt-2">{createdAt}</p>
      </div>
    </Link>
  )
}
