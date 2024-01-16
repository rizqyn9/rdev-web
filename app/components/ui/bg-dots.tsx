import clsxm from "~/utils/clsxm.tsx"

export function BGDots(props: { className?: string }) {
  const { className } = props
  return (
    <div
      className={clsxm(["pointer-events-none absolute inset-0", className])}
      style={{
        backgroundPosition: "center",
        backgroundSize: "35px 35px",
        backgroundImage: "radial-gradient(white 1px, transparent 0)",
        opacity: 0.4,
      }}
    />
  )
}
