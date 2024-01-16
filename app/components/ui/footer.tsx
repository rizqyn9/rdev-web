import { Link } from "@remix-run/react"
import { Icon, IconName } from "~/components/ui/icon.tsx"
import { NAV_ITEM } from "~/components/ui/nav.tsx"
import { Section } from "./layout.tsx"

type Contacts = Array<{
  to: string
  icon: IconName
}>

const CONTACTS: Contacts = [
  {
    icon: "github-mark",
    to: "https://github.com/rizqyn9",
  },
  {
    icon: "rss",
    to: "/sitemap.xml",
  },
  {
    icon: "telegram",
    to: "https://t.me/rizqynugroho9",
  },
  {
    icon: "linkedin",
    to: "https://www.linkedin.com/in/rizqynugroho9",
  },
]

export function Footer() {
  return (
    <footer className="border-t-2 mt-14">
      <Section className="">
        <div className="grid mt-8 grid-cols-2 md:grid-cols-6 space-y-8 place-content-start pb-8">
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Rizqy P. A. N.</h2>
            <p>Full stack developer</p>
            <p>Thanks for reading!</p>
            <div className="flex gap-4">
              {CONTACTS.map((contact) => (
                <a
                  href={contact.to}
                  key={contact.icon}
                  target="__blank"
                  className="w-8 h-8"
                >
                  <Icon size={"lg"} name={contact.icon} />
                </a>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-4 col-span-2">
            <h2 className="text-lg font-bold">Sitemap</h2>
            <ul className="flex flex-col gap-4">
              {NAV_ITEM.map((link) => (
                <Link to={link.to} key={link.label} className="text-slate-400">
                  <ul>{link.label}</ul>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      <Section className="text-center text-slate-400 pb-4">
        <p>&copy; 2023 rdev-hub.com</p>
        <p>
          All rights reserved | Built with ❤️ and{" "}
          <a href="https://remix.run/" className="text-white" target="__blank">
            remix
          </a>
        </p>
      </Section>
    </footer>
  )
}

const SITEMAP = [
  { name: "HOME", to: "/" },
  { name: "BLOG", to: "/blog" },
  { name: "ABOUT ME", to: "/about-me" },
  { name: "CONTACT", to: "/contact" },
]

export function FooterNew() {
  return (
    <Section className="py-16">
      <hr className="border border-white" />
      <div className="grid grid-cols-5 gap-4 mt-8">
        <div>
          <p className="text-xl font-semibold">SITEMAP</p>
          <ul className="mt-2 text-gray-400">
            {SITEMAP.map((site) => (
              <li key={site.to}>
                <Link to={site.to}>{site.name}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xl font-semibold">SOCIALS</p>
          <ul className="mt-2 text-gray-400">
            {["INSTAGRAM", "GITHUB", "GMAIL"].map((site) => (
              <li key={site}>{site}</li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
