import clsxm from "~/utils/clsxm.tsx"

type TagProps = {
  text: string
}

export function Tag(props: TagProps) {
  const { text } = props

  return (
    <button className="focus-ring bg-slate-800 text-white relative block h-auto w-auto whitespace-nowrap rounded-full px-6 py-3">
      {text}
    </button>
  )
}

type TagsProps = {
  list: TagProps[]
} & JSX.IntrinsicElements["div"]

export function Tags(props: TagsProps) {
  const { list, className, ...rest } = props

  return (
    <div className={clsxm("flex gap-5", className)} {...rest}>
      {list.map((x) => (
        <Tag key={x.text} text={x.text} />
      ))}
    </div>
  )
}
