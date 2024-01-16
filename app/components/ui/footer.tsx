import { Link } from "@remix-run/react"
import { Icon, IconName } from "~/components/ui/icon.tsx"
import { Section } from "./layout.tsx"
import { NAV } from "./header.tsx"
import { LightStick } from "./light-stick.tsx"

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

const SOCIALS = [
  {
    name: "LINKEDIN",
    href: "https://www.linkedin.com/in/rizqynugroho9",
  },
  {
    name: "GITHUB",
    href: "https://github.com/rizqyn9",
  },
  {
    name: "GMAIL",
    href: "mailto:rizqynugroho88@gmail.com",
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
              {[...NAV, { title: "RSS", to: "/sitemap.xml" }].map((link) => (
                <Link to={link.to} key={link.to} className="text-slate-400">
                  <ul>{link.title}</ul>
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

export function FooterNew() {
  return (
    <Section className="py-16">
      <div className="flex mb-3">
        <button
          onClick={() => {
            window?.scrollTo({
              top: 0,
              behavior: "smooth",
            })
          }}
          className="ml-auto focus-ring px-2 py-1 rounded-sm hover:underline underline-offset-4"
        >
          (back_to_top)
        </button>
      </div>
      <LightStick direction="x" className="mt-4" />
      <div className="grid md:grid-cols-5 grid-cols-3 gap-4 mt-8">
        <div>
          <p className="text-xl font-semibold">SITEMAP</p>
          <ul className="mt-2 text-gray-400">
            {[...NAV, { title: "RSS", to: "/sitemap.xml" }].map((site) => (
              <li key={site.to} className="hover:underline underline-offset-2">
                <Link to={site.to}>{site.title}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xl font-semibold">SOCIALS</p>
          <ul className="mt-2 text-gray-400">
            {SOCIALS.map((social) => (
              <li
                key={social.name}
                className="hover:underline underline-offset-2"
              >
                <a href={social.href} target="__blank">
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}
