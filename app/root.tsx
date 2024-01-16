import { cssBundleHref } from "@remix-run/css-bundle"
import {
  MetaFunction,
  json,
  type LinksFunction,
  type LoaderFunctionArgs,
} from "@remix-run/node"
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
import { getEnv } from "./utils/env.server.ts"
import { getDomainUrl } from "./utils/misc.ts"
import { getToast } from "./utils/toast.server.ts"
import { combineHeaders } from "./utils/headers.server.ts"
import { EpicToaster } from "./components/toaster.tsx"
import { Header } from "./components/ui/header.tsx"
import { FooterNew } from "~/components/ui/footer.tsx"
import { getFavicoLinks, getFontLinks, getRootMeta } from "./utils/root-seo.ts"

export const links: LinksFunction = () => {
  return [
    ...getFontLinks,
    cssBundleHref ? { rel: "preload", href: cssBundleHref, as: "style" } : null,
    { rel: "preload", href: tailwindStyleSheetUrl, as: "style" },
    { rel: "preload", href: proseStyleSheetUrl, as: "style" },
    { rel: "preload", href: appStyleSheetUrl, as: "style" },
    ...getFavicoLinks,
    cssBundleHref ? { rel: "stylesheet", href: cssBundleHref } : null,
    { rel: "stylesheet", href: tailwindStyleSheetUrl },
    { rel: "stylesheet", href: appStyleSheetUrl },
    { rel: "stylesheet", href: proseStyleSheetUrl },
  ].filter(Boolean)
}

export const meta: MetaFunction = () => {
  return [...getRootMeta]
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { toast, headers: toastHeaders } = await getToast(request)
  return json(
    {
      toast,
      env: getEnv(),
      requestInfo: {
        origin: getDomainUrl(request),
        path: new URL(request.url).pathname,
      },
    },
    {
      headers: combineHeaders(
        // { 'Server-Timing': timings.toString() },
        toastHeaders
        // csrfCookieHeader ? { 'set-cookie': csrfCookieHeader } : null,
      ),
    }
  )
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
            nonce={nonce}
          />
        )}
      </head>
      <body className="bg-background-v2 font-normal text-white font-sans">
        <Header />
        <EpicToaster toast={data.toast} />
        <Outlet />
        <FooterNew />
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
