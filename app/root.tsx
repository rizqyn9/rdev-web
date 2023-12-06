import { cssBundleHref } from "@remix-run/css-bundle"
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node"
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react"
import tailwindStyleSheetUrl from "./styles/tailwind.css"
import proseStyleSheetUrl from "./styles/prose.css"
import appStyleSheetUrl from "./styles/app.css"
import { useNonce } from "./utils/nonce-provider.ts"
import { Nav } from "./components/ui/nav.tsx"
import { getEnv } from "./utils/env.server.ts"
import { getDomainUrl } from "./utils/misc.ts"

export const links: LinksFunction = () => {
  return [
    cssBundleHref ? { rel: "preload", href: cssBundleHref, as: "style" } : null,
    { rel: "preload", href: tailwindStyleSheetUrl, as: "style" },
    { rel: "preload", href: proseStyleSheetUrl, as: "style" },
    { rel: "preload", href: appStyleSheetUrl, as: "style" },
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
    { rel: "stylesheet", href: appStyleSheetUrl },
    { rel: "stylesheet", href: proseStyleSheetUrl },
  ].filter(Boolean)
}

export function loader({ request }: LoaderFunctionArgs) {
  return {
    env: getEnv(),
    requestInfo: {
      origin: getDomainUrl(request),
      path: new URL(request.url).pathname,
    },
  }
}

export type RootLoaderType = typeof loader

export default function App() {
  const data = useLoaderData<typeof loader>()
  const nonce = useNonce()
  return (
    <html lang="en" className="dark">
      <head>
        <Meta />
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Links />
        {process.env.NODE_ENV !== "development" && (
          <script
            async
            src="https://us.umami.is/script.js"
            data-website-id="93bcd5d0-5695-456e-893c-fd77b4c7aba6"
          />
        )}
      </head>
      <body className="bg-slate-950 font-normal text-white font-sans">
        <Nav />
        <Outlet />
        <ScrollRestoration nonce={nonce} />
        <script
          nonce={nonce}
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.env)}`,
          }}
        />
        <Scripts nonce={nonce} />
        <LiveReload nonce={nonce} />
      </body>
    </html>
  )
}
