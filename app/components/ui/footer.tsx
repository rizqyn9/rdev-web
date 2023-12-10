import { Link } from "@remix-run/react"
import { Icon } from "~/components/ui/icon.tsx"
import { NAV_ITEM } from "~/components/ui/nav.tsx"
import { Section } from "./layout.tsx"

export function Footer() {
  return (
    <footer className="border-t-2 mt-14">
      <Section className="">
        <div className="grid mt-8 grid-cols-2 md:grid-cols-6 space-y-8 place-content-start pb-8">
          <div className="col-span-2 flex flex-col gap-4">
            <h2 className="text-4xl font-bold">Rizqy P. A. N.</h2>
            <p>Full stack developer</p>
            <div className="flex gap-4">
              <Icon name="github-mark" />
              <Icon name="rss" />
              <Icon name="telegram" />
              <Icon name="linkedin" />
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
      <Section className="text-center italic text-slate-400">
        <p>Copyright rdev 2023</p>
      </Section>
    </footer>
  )
}
