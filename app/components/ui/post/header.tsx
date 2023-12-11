import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar.tsx"
import { Section } from "~/components/ui/layout.tsx"

type ContentHeaderProps = {
  title: string
  readTime: string
  publish: {
    at: string
    name: string
    initial: string
    avatar: string
  }
  banner: string
}

export function ContentHeader(props: ContentHeaderProps) {
  const { publish, title, readTime, banner } = props

  return (
    <>
      <Section className="flex flex-col gap-4" containerClassName="mx-0">
        <p className="text-center text-2xl md:text-4xl font-bold mx-[10vw] leading-10 p-8">
          {title}
        </p>
        <div className="aspect-w-8 aspect-h-4 overflow-hidden rounded">
          <img className="object-cover" src={banner} alt={title} />
        </div>
      </Section>
      <Section containerClassName="px-0 md:px-8 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-1 py-4 gap-4 w-2/3 md:w-auto mx-auto">
          <div className="flex gap-4 items-center col-span-2 my-auto h-full mx-auto md:mx-0">
            <Avatar className="h-12 w-12">
              <AvatarImage src={publish.avatar} />
              <AvatarFallback>{publish.initial}</AvatarFallback>
            </Avatar>
            <p>{publish.name}</p>
          </div>
          <div className="flex flex-col text-center md:text-left text-sm">
            <p className="font-semibold">Time to read</p>
            <p>~ {readTime}</p>
          </div>
          <div className="flex flex-col text-center md:text-left text-sm">
            <p className="font-semibold">Published</p>
            <p>{publish.at}</p>
          </div>
        </div>
      </Section>
    </>
  )
}
