import { Link, useLocation } from "@remix-run/react"
import { AnimatedTextTemplate1 } from "../typography/animated.tsx"
import clsxm from "~/utils/clsxm.tsx"
import { Section } from "./layout.tsx"

export const NAV_ITEM = [
  {
    label: "Blog",
    to: "/blog",
  },
  {
    label: "Work",
    to: "/#work",
  },
  {
    label: "About",
    to: "/about",
  },
]

function NavRdev() {
  return (
    <Link to="/">
      <h1 className="text-2xl font-bold">
        <AnimatedTextTemplate1 text="Rdev." />
        {/* RDev<span className="text-red-400 text-4xl">.</span> */}
      </h1>
    </Link>
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
  const path = useLocation()

  return (
    <nav
      className={clsxm([
        "bg-slate-950 fixed top-0 z-50 left-0 right-0",
        path.pathname != "/" && "backdrop-blur bg-opacity-30",
      ])}
    >
      <Section>
        <div className="flex justify-between pb-1 md:pb-4 pt-2 md:pt-7 items-center">
          <NavRdev />
          <NavList />
          {/* <NavButton /> */}
        </div>
      </Section>
    </nav>
  )
}
