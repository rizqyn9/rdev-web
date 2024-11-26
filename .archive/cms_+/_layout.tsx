import { Outlet } from "@remix-run/react"
import { Layout } from "~/components/ui/layout.tsx"

export default function () {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
