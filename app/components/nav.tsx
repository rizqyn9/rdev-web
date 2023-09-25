import { Link } from "@remix-run/react"

const NAV_ITEM = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Home",
    to: "/a",
  },
]

function NavRdev() {
  return <h1 className="text-2xl font-bold">RDev .</h1>
}

function NavList() {
  return (
    <div className="flex gap-3">
      {NAV_ITEM.map((item) => {
        return (
          <Link
            to={item.to}
            key={item.to}
            className="group transition duration-300"
          >
            <p className="px-2">{item.label}</p>
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-500"></span>
          </Link>
        )
      })}
    </div>
  )
}

function NavButton() {
  return (
    <span className="bg-black w-7 h-10 flex flex-col gap-3">
      <i className="w-4 h-1 bg-white block" />
      <i className="w-4 h-1 bg-white block" />
    </span>
  )
}

export function Nav() {
  return (
    <nav className="bg-slate-950">
      <div className="container max-w-3xl flex justify-between px-4 py-4">
        <NavRdev />
        <NavList />
        <NavButton />
      </div>
    </nav>
  )
}
