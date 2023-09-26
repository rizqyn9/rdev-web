import type { MetaFunction } from "@remix-run/node"
import { Nav } from "~/components/ui/nav"
import { Hero } from "~/components/section/home/hero"
import { AboutMe } from "~/components/section/home/about-me"
import { SelectedProject } from "~/components/section/home/projects"

export const meta: MetaFunction = () => {
  return [
    { title: "RDev." },
    { name: "description", content: "Welcome to RDev!" },
  ]
}

export default function Index() {
  return (
    <>
      <Nav />
      <main className="flex flex-col">
        <Hero />
        <AboutMe />
        <SelectedProject />
      </main>
    </>
  )
}
