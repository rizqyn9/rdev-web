type BannerProps = {} & JSX.IntrinsicElements["img"]

export function Banner(props: BannerProps) {
  // eslint-disable-next-line jsx-a11y/alt-text
  return <img className="overflow-hidden w-full h-[2rem]" {...props} />
}
