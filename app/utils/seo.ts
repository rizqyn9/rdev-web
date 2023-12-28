export function getSocialMetas({
  url,
  title = "Helping people make the world a better place through quality software",
  description = "Make the world better with software",
  keywords = "",
}: {
  image?: string
  url: string
  title?: string
  description?: string
  keywords?: string
}) {
  const titleEncoded = encodeURI(title)
  const image = `https://ik.imagekit.io/connect2203/rdevblog/tr:l-text,tg-b,w-bh_div_1,fs-bh_div_15,pa-10_20_30_40,co-ffffff,i-${titleEncoded},l-end/social-background.png`

  return [
    { title },
    { name: "description", content: description },
    { name: "keywords", content: keywords },
    { name: "image", content: image },
    { name: "og:url", content: url },
    { name: "og:title", content: title },
    { name: "og:description", content: description },
    { name: "og:image", content: image },
    {
      name: "twitter:card",
      content: image ? "summary_large_image" : "summary",
    },
    { name: "twitter:creator", content: "@rizqynugroho4" },
    { name: "twitter:site", content: "@rizqynugroho4" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: title },
  ]
}
