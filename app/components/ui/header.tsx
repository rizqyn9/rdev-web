import { Link } from "@remix-run/react"
import { Section } from "./layout.tsx"
import { Logo } from "./logo.tsx"

export const NAV = [
  { title: "HOME", to: "/" },
  { title: "BLOG", to: "/blog" },
  { title: "ABOUT ME", to: "/about" },
  { title: "CONTACT", to: "/contact" },
]

export function Header() {
  return (
    <header className="py-4 fixed inset-0 bottom-auto z-50 backdrop-blur-xl">
      <Section className="flex justify-between items-center">
        <Logo />
        <Nav />
      </Section>
    </header>
  )
}

function Nav() {
  return (
    <ul className="flex gap-4 text-sm md:text-lg">
      {NAV.map((nav) => (
        <li key={nav.title}>
          <Link prefetch="intent" to={nav.to}>
            {nav.title}
          </Link>
        </li>
      ))}
    </ul>
  )
}
