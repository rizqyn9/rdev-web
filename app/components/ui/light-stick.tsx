import clsxm from "~/utils/clsxm.tsx"

type LightStickProps = {
  direction: "x" | "y"
  className?: string
}

export function LightStick(props: LightStickProps) {
  const { direction, className } = props

  return (
    <div
      className={clsxm([direction === "x" ? "stick-x" : "stick-y", className])}
    >
      <div
        className={clsxm([
          direction === "x" ? "stick-runner-x" : "stick-runner-y",
        ])}
      />
    </div>
  )
}
