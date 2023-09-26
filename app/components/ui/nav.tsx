import { Link } from "@remix-run/react"
import { AnimatedTextTemplate1 } from "../typography/animated"

const NAV_ITEM = [
  {
    label: "Home",
    to: "/",
  },
  {
    label: "Blog",
    to: "#featured-project",
  },
  {
    label: "Work",
    to: "#featured-project",
  },
  {
    label: "About",
    to: "#about-me",
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
    <div className="flex gap-1 sm:gap-2 text-xs md:text-xl font-thin">
      {NAV_ITEM.map((item) => {
        return (
          <Link
            to={item.to}
            key={item.label}
            className="group transition duration-300 flex flex-col gap-0"
          >
            <AnimatedTextTemplate1
              text={item.label.toUpperCase()}
              className="px-1 md:px-2"
            />
            {/* <p className="px-2">{item.label}</p> */}
            <span className="block max-w-0 group-hover:max-w-full sm:-mt-2 transition-all duration-500 h-0.5 bg-slate-500"></span>
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
      <div className="container px-4 flex justify-between pb-1 md:pb-4 pt-2 md:pt-7 items-center">
        <NavRdev />
        <NavList />
        {/* <NavButton /> */}
      </div>
    </nav>
  )
}
