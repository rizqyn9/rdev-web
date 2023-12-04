import { Outlet } from "@remix-run/react"

export default function () {
  return (
    <div className="pt-[5rem] px-5 max-w-2xl mx-auto">
      <Outlet />
    </div>
  )
}
