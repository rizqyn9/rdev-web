import { Link } from "@remix-run/react"
import clsxm from "~/utils/clsxm.tsx"

export default function () {
  return (
    <div className="container py-10">
      <div className="mb-5 flex flex-col gap-4">
        <h2 className="text-4xl font-bold">Featured Post</h2>
        <CardPost isFeatured to="/blog/test" />
      </div>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-6 mb-20 lg:mb-40">
        {new Array(10).fill(10).map((x, idx) => (
          <CardPost key={idx} to="/blog/test" />
        ))}
      </div>
    </div>
  )
}

type CardPostProps = {
  isFeatured?: boolean
  to: string
}

function CardPost(props: CardPostProps) {
  const { isFeatured = false, to } = props
  return (
    <article
      className={clsxm(
        "group",
        "border p-3 relative rounded-md w-full border-white/10 hover:bg-slate-800 shadow-inner hover:shadow-transparent transition-all duration-500 bg-slate-900 grid gap-5 items-center",
        isFeatured ? "grid-cols-2 gap-12" : "gap-5 grid-cols-1"
      )}
    >
      {/* Image */}
      <div
        className={clsxm(
          "rounded overflow-hidden shadow-md shadow-black max-w-full w-full",
          isFeatured && "order-2"
        )}
      >
        <img
          alt=""
          src="https://creatures.dev/_astro/charts-3.56128dcd_B0Jwd.webp"
        />
      </div>

      {/* Content */}
      <div
        className={clsxm(
          "flex px-4 py-2 w-full flex-col gap-3",
          isFeatured ? "order-0 justify-between py-2 h-full" : "flex-1"
        )}
      >
        {/* Container */}
        <div
          className={clsxm([
            "relative max-w-full bg-inherit",
            "before:content-[''] before:inset-y-0 before:absolute before:left-0 before:w-5",
            "after:content-[''] after:inset-y-0 after:absolute after:right-0 after:w-5",
            "before:bg-gradient-to-r from-slate-900 group-hover:from-slate-800 to-transparent after:bg-gradient-to-l transition-all duration-500",
          ])}
        >
          <div
            className={clsxm([
              "flex gap-1",
              "overflow-x-scroll scrollbar-none ",
            ])}
          >
            {[
              "React",
              "Nodejs",
              "Nodejs2",
              "Nodejs1",
              "Nodejs3",
              "Nodejs4",
            ].map((x) => (
              <button
                className="text-xs border rounded-full border-white px-2 py-1"
                key={x}
              >
                {x}
              </button>
            ))}
          </div>
        </div>
        <div className="flex gap-4 w-full items-center">
          <button className="flex items-center gap-2">
            <div className="bg-red-50 h-4 w-4 rounded-full"></div>
            <p>Rizqy</p>
          </button>
          <hr className="flex-1 border" />
          <p>Nov 1</p>
        </div>
        <h2 className={clsxm("font-bold", isFeatured ? "text-2xl" : "text-xl")}>
          The Jokers in a Deck of cards - on the ever-evolving Generalist Role
        </h2>
        <p className="text-slate-400 text-sm">
          On the ever-evolving generalist/full-stack role and to what extent
          does it make sense to broaden your skillset.
        </p>
        <Link
          to={to}
          className="text-link font-medium hover:underline text-red-200 hover:underline-offset-2 hover:cursor-pointer "
          // after:content-[" "] after:absolute after:inset-0
        >
          {"Read On ->"}
        </Link>
      </div>
    </article>
  )
}
