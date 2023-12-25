import { generateSitemap } from "@nasa-gcn/remix-seo"
// @ts-expect-error - this does work, though it's not exactly a public API
import { routes } from "@remix-run/dev/server-build"
import { type DataFunctionArgs } from "@remix-run/node"
import { getDomainUrl } from "~/utils/misc.ts"

export function loader({ request }: DataFunctionArgs) {
  // Object.assign(routes, {
  //   "routes/test": {
  //     id: "routes/upload/a",
  //     parentId: "root/asd",
  //     path: "upload/asd",
  //     index: undefined,
  //     caseSensitive: undefined,
  //     module: [Object],
  //   },
  // })

  return generateSitemap(request, routes, {
    siteUrl: getDomainUrl(request),
    headers: {
      "Cache-Control": `public, max-age=${60 * 5}`,
    },
  })
}
