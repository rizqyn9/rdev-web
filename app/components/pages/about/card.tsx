import clsxm from "~/utils/clsxm.tsx"

export function Card(props: React.ComponentProps<"div">) {
  const { className, ...rest } = props
  return (
    <div
      className={clsxm([
        "border border-white/20 bg-white/5 p-2 rounded-lg relative overflow-hidden backdrop-blur-sm",
        className,
      ])}
      {...rest}
    />
  )
}
