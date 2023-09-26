import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react"
import tailwindcss from "~/tailwind.css"

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
  { rel: "stylesheet", href: tailwindcss },
  {
    rel: "preload",
    as: "font",
    href: "/fonts/poppins/Poppins-ExtraBold.ttf",
    type: "font/ttf",
    crossOrigin: "anonymous",
  },
  // {
  //   rel: "preload",
  //   as: "font",
  //   href: "/fonts/Matter-Regular.woff2",
  //   type: "font/woff2",
  //   crossOrigin: "anonymous",
  // },
]

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-slate-950 font-normal text-white font-sans">
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  )
}
