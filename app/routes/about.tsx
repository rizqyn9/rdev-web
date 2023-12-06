import { Layout, Section } from "~/components/ui/layout.tsx"

export default function () {
  return (
    <Layout>
      <Section>
        <div className="grid grid-cols-2 gap-8 lg:py-12">
          <div className="col-span-full lg:col-span-1 lg:order-2 flex place-content-center">
            <div className="w-2/3 mx-auto lg:w-1/2">
              <div className="aspect-w-1 aspect-h-1 rounded-full overflow-hidden object-cover relative">
                <img
                  className="object-cover"
                  alt="rizqynugroho"
                  title="rizqynugroho"
                  src="https://ik.imagekit.io/connect2203/rdevblog/me_uxL2hLXqt.png?updatedAt=1701761952485"
                />
              </div>
            </div>
          </div>
          <div className="col-span-full lg:col-span-1">
            <p className="leading-tight text-3xl lg:text-4xl text-white">
              Hi, I'm Rizqy Prastya,
            </p>
            <p className="leading-tight text-3xl text-gray-400 dark:text-slate-500 mt-3">
              I seasoned full-stack engineer with a passion for creating
              seamless, user-friendly applications. With a solid foundation in
              both front-end and back-end technologies, I thrives in fast-paced
              environments, tackling complex problems with innovative solutions.
            </p>
          </div>
        </div>
      </Section>
    </Layout>
  )
}
