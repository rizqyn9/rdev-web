import { Link } from "@remix-run/react"
import { AnimatedTextTemplate1 } from "../typography/animated"

const NAV_ITEM = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "/a",
  },
  {
    label: "Work",
    to: "/a",
  },
  {
    label: "About",
    to: "/a",
  },
]

function NavRdev() {
  return (
    <h1 className="text-2xl font-bold">
      <AnimatedTextTemplate1 text="Rdev." />
      {/* RDev<span className="text-red-400 text-4xl">.</span> */}
    </h1>
  )
}

function NavList() {
  return (
    <div className="flex gap-2">
      {NAV_ITEM.map((item) => {
        return (
          <Link
            to={item.to}
            key={item.label}
            className="group transition duration-300"
          >
            <AnimatedTextTemplate1 text={item.label} className="px-2" />
            {/* <p className="px-2">{item.label}</p> */}
            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-slate-500"></span>
          </Link>
        )
      })}
    </div>
  )
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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
    <nav className="bg-slate-950 fixed top-0 z-50 left-0 right-0">
      <div className="container px-4 flex justify-between py-4 items-center">
        <NavRdev />
        <NavList />
        {/* <NavButton /> */}
      </div>
    </nav>
  )
}
