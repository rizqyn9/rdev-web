export function getBlogUrl(params: { slug: string }) {
  const { slug } = params
  return `/blog/${slug}`
}
