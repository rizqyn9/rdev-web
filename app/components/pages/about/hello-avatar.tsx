import { Card } from "./card.tsx"

export function HelloAvatar() {
  return (
    <Card className="p-0">
      <div className="absolute z-10 inset-x-0 bottom-0 p-2 flex flex-col gap-1 text-sm">
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md rounded-tl-lg whitespace-nowrap">
          Hallo 👋🏼
        </p>
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          My name is Rizqy Prastya Ari Nugroho
        </p>
        <p className="border border-white bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          But you can call me Rizqy
        </p>
        <p className="border border-white rounded-bl-lg bg-gray-400/10 backdrop-blur-sm w-min px-2 py-1 rounded-r-md whitespace-nowrap">
          Grab my email, and get in touch
        </p>
      </div>
      <div
        className="aspect-w-1 aspect-h-1 overflow-hidden object-cover relative grayscale"
        // style={{
        //   boxShadow: "inset 10px 10px 10px 10px rgb(0 0 0 / 1)",
        // }}
      >
        <img
          className="object-cover"
          alt="rizqynugroho"
          title="rizqynugroho"
          src="https://ik.imagekit.io/connect2203/rdevblog/me_uxL2hLXqt.png?updatedAt=1701761952485"
        />
      </div>
    </Card>
  )
}
