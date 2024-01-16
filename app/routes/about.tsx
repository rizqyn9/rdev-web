import clsxm from "~/utils/clsxm.tsx"
import React from "react"
import { BGDots } from "~/components/ui/bg-dots.tsx"
import { Section } from "~/components/ui/layout.tsx"
import { CardExperience } from "~/components/pages/about/experience.tsx"
import { MetaFunction } from "@remix-run/node"
import { getSocialMetas } from "~/utils/seo.ts"
import { RootLoaderType } from "~/root.tsx"
import { getUrl } from "~/utils/misc.ts"
import { HelloAvatar } from "~/components/pages/about/hello-avatar.tsx"
import { AboutTools } from "~/components/pages/about/tools.tsx"

export const meta: MetaFunction<unknown, { root: RootLoaderType }> = ({
  matches,
}) => {
  const requestInfo = matches.find((m) => m.id === "root")?.data.requestInfo

  return [
    ...getSocialMetas({
      url: getUrl(requestInfo),
      title: "Rdev | About",
    }),
  ]
}

export default function AboutMePage() {
  return (
    <>
      <BGDots />
      <Section className="mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <CardAboutMe />
            <CardExperience />
          </div>
          <div className="flex flex-col gap-4">
            <HelloAvatar />
            <AboutTools />
          </div>
        </div>
      </Section>
    </>
  )
}

function Card(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props
  return (
    <div
      className={clsxm([
        "border border-white/20 bg-white/5 p-2 rounded-lg relative overflow-hidden backdrop-blur-sm",
        className,
      ])}
      {...rest}
    />
  )
}

function CardAboutMe() {
  return (
    <Card className="p-6 pr-8 text-lg">
      Fullstack engineer with a passion for creating seamless, user-friendly
      applications. With a solid foundation in both front-end and back-end
      technologies, I thrives in fast-paced environments, tackling complex
      problems with innovative solutions.
    </Card>
  )
}
