import { Link } from "@remix-run/react"
import { Icon } from "~/components/ui/icon.tsx"
import { Layout } from "~/components/ui/layout.tsx"
import { NAV_ITEM } from "~/components/ui/nav.tsx"

function Footer() {
  return (
    <Layout>
      <footer className="grid grid-cols-2 md:grid-cols-6 space-y-8 place-content-start">
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
      </footer>
    </Layout>
  )
}
export default function () {
  return <Footer />
}