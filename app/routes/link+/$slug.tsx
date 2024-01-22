import { LoaderFunctionArgs, redirectDocument } from "@remix-run/node"

const myLinks = [
  {
    id: "email",
    redirectTo: "mailto:rizqynugroho88@gmail.com",
  },
  {
    id: "github",
    redirectTo: "https://github.com/rizqyn9",
  },
  {
    id: "linkedin",
    redirectTo: "https://www.linkedin.com/in/rizqynugroho9",
  },
  {
    id: "blog",
    redirectTo: "https://rdev.space/blog",
  },
  {
    id: "portfolio",
    redirectTo: "https://rdev.space",
  },
  {
    id: "telegram",
    redirectTo: "https://t.me/rizqynugroho9",
  },
]

export async function loader({ params }: LoaderFunctionArgs) {
  let { slug } = params
  slug = slug?.toLowerCase().trim()

  const target = myLinks.findIndex((_link) => _link.id === slug)
  if (target < 0) {
    throw new Error("Not Found")
  }

  return redirectDocument(myLinks[target].redirectTo)
}
