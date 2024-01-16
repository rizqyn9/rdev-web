import { LinkDescriptor } from "@remix-run/node"

export const getFontLinks: LinkDescriptor[] = [
  {
    rel: "preload",
    as: "font",
    href: "/fonts/Pixelify-Sans.woff2",
    type: "font/woff2",
    crossOrigin: "anonymous",
  } as const,
  {
    rel: "preload",
    as: "font",
    href: "/fonts/montserrat.woff2",
    type: "font/woff2",
    crossOrigin: "anonymous",
  } as const,
  {
    rel: "preload",
    as: "font",
    href: "/fonts/poppins.woff2",
    type: "font/woff2",
    crossOrigin: "anonymous",
  } as const,
]

export const getFavicoLinks: LinkDescriptor[] = [
  {
    rel: "apple-touch-icon",
    sizes: "180x180",
    href: "/favicons/apple-touch-icon.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "32x32",
    href: "/favicons/favicon-32x32.png",
  },
  {
    rel: "icon",
    type: "image/png",
    sizes: "16x16",
    href: "/favicons/favicon-16x16.png",
  },
  { rel: "icon", href: "/favicon.ico" },
  { rel: "manifest", href: "/site.webmanifest" },
  {
    rel: "mask-icon",
    href: "/safari-pinned-tab.svg",
    color: "#e33b3b",
  },
]

export const getRootMeta = [
  {
    name: "msapplication-TileColor",
    content: "#000000",
  },
  {
    name: "theme-color",
    content: "#ffffff",
  },
]
