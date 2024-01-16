import type { MetaFunction } from "@remix-run/node"
import { Hero } from "~/components/section/home/hero.tsx"
import { AboutMe } from "~/components/section/home/about-me.tsx"
import { SelectedProject } from "~/components/section/home/projects.tsx"

export const meta: MetaFunction = () => {
  return [
    { title: "RDev." },
    { name: "description", content: "Welcome to RDev!" },
  ]
}

export default function Index() {
  return (
    <main className="flex flex-col">
      <Hero />
      <AboutMe />
      <SelectedProject />
    </main>
  )
}
