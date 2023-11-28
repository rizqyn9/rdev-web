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
import tailwindStyleSheetUrl from "./styles/tailwind.css"
import proseStyleSheetUrl from "./styles/prose.css"
import { useNonce } from "./utils/nonce-provider.ts"

export const links: LinksFunction = () => {
  return [
    cssBundleHref ? { rel: "preload", href: cssBundleHref, as: "style" } : null,
    { rel: "preload", href: tailwindStyleSheetUrl, as: "style" },
    { rel: "preload", href: proseStyleSheetUrl, as: "style" },
    { rel: "icon", href: "/favicon.ico" },

    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/favicons/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/favicons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/favicons/favicon-16x16.png",
    },
    { rel: "manifest", href: "/site.webmanifest" },

    //
    cssBundleHref ? { rel: "stylesheet", href: cssBundleHref } : null,
    { rel: "stylesheet", href: tailwindStyleSheetUrl },
    { rel: "stylesheet", href: proseStyleSheetUrl },
  ].filter(Boolean)
}

export default function App() {
  const nonce = useNonce()
  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
      </head>
      <body className="bg-slate-950 font-normal text-white font-sans">
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}
