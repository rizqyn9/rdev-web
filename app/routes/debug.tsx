import { json } from "@remix-run/node"
import { useLoaderData } from "@remix-run/react"
import { checkConnection } from "~/services/db.server.ts"

export async function loader() {
  return json({
    mongo: {
      status: await checkConnection(),
    },
  })
}

export default function () {
  const data = useLoaderData<typeof loader>()

  return (
    <div className="mt-24 max-w-5xl mx-auto px-5">
      <p>Status</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
