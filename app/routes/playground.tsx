import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar.tsx"
import { Layout, Section } from "~/components/ui/layout.tsx"

export default function () {
  return (
    <Layout className="">
      <Section className="flex flex-col gap-4" containerClassName="mx-0">
        <p className="text-center text-2xl md:text-4xl font-bold mx-[10vw] leading-10 p-8">
          How the Epic Stack Makes You Faster
        </p>
        <div className="aspect-w-8 aspect-h-4 overflow-hidden rounded">
          {/*  eslint-disable-next-line jsx-a11y/alt-text */}
          <img
            className="object-cover"
            src="https://ik.imagekit.io/connect2203/rdevblog/misc/cash-macanaya-9-X1-nzgqdI-unsplash_krH4tv8pu.jpg?updatedAt=1701691768853"
          />
        </div>
      </Section>
      <Section containerClassName="px-0 md:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 py-4 gap-4 w-2/3 md:w-auto mx-auto">
          <div className="flex gap-4 items-center col-span-2 my-auto h-full mx-auto md:mx-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src="https://ik.imagekit.io/connect2203/rdevblog/avatar_PRYh9Z9Bx.png?updatedAt=1701681868075" />
              <AvatarFallback>RN</AvatarFallback>
            </Avatar>
            <p>Rizqy Nugroho</p>
          </div>
          <div className="flex flex-col text-center md:text-left text-sm">
            <p className="font-semibold">Time to read</p>
            <p>~ 3 minutes</p>
          </div>
          <div className="flex flex-col text-center md:text-left text-sm">
            <p className="font-semibold">Published</p>
            <p>December 11, 2023</p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
