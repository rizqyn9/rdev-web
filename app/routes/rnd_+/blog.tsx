import { Link } from "@remix-run/react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar.tsx"
import { Section } from "~/components/ui/layout.tsx"

export default function RndBlog() {
  return (
    <Section className="py-16 flex flex-col gap-10">
      <BlogCardPreview />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
        <BlogCard />
      </div>
    </Section>
  )
}

function BlogCard() {
  return (
    <Link to="" className="group">
      <div className="border border-white/20 overflow-hidden rounded-tl-2xl rounded-br-2xl focus-ring shadow-lg shadow-gray-800">
        <img src="/static/test-blog.png" title="test-blog" alt="test-blog" />
      </div>
      <div className="mt-4">
        <p className="text-xl">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet,
          tempore.
        </p>
        <p className="text-sm text-gray-400 mt-2">December 22, 2023</p>
      </div>
    </Link>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function BlogCardPreview() {
  return (
    <div className="border grid group md:grid-cols-2 gap-2 lg:gap-4 border-white/10 rounded-tl-3xl rounded-br-3xl p-4">
      <div className="aspect-w-16 aspect-h-10 rounded-tl-xl rounded-br-xl overflow-hidden border border-white/20 focus-ring shadow-lg shadow-gray-800">
        <img src="/static/test-blog.png" title="test-blog" alt="test-blog" />
      </div>
      <div className="md:p-2 flex flex-col py-4 pr-2">
        <div className="flex gap-2 items-center self-start">
          <Avatar className="">
            <AvatarFallback className="bg-gray-800 text-sm">RN</AvatarFallback>
            <AvatarImage />
          </Avatar>
          <p>Rizqy Nugroho</p>
        </div>
        <div className="md:my-auto my-6">
          <p className="text-xl line-clamp-2 lg:text-2xl font-semibold lg:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sequi,
            similique.
          </p>
          <p className="line-clamp-2 text-lg mt-2 text-gray-400 lg:text-xl lg:line-clamp-3">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Minus
            accusantium voluptatibus blanditiis unde cupiditate nihil quaerat
            minima repudiandae temporibus quidem?
          </p>
        </div>
        <div className="self-end mt-auto text-gray-400">
          <p>December 23, 2023</p>
        </div>
      </div>
    </div>
  )
}
