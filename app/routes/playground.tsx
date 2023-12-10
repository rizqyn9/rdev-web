import { CardBlog } from "~/components/ui/card-blog.tsx"
import { Layout, Section } from "~/components/ui/layout.tsx"

const MOCK =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse facere adipisci expedita corrupti harum fugit omnis, eaque hic minus a impedit saepe ratione obcaecati, architecto molestiae laudantium veritatis dolores vero."

function Footer() {
  return (
    <Layout className="flex flex-col gap-4">
      <Section>
        <CardBlog
          to={""}
          tags={[]}
          title={MOCK}
          desc={MOCK}
          id={""}
          slug={""}
          date={{
            raw: "Nov 20, 2023",
          }}
          author={{
            avatar:
              "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
            name: "Rizqy Rizqy Rizqy Rizqy",
          }}
          banner={{
            title: "",
            url: "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
          }}
          type={"featured"}
        />
      </Section>
      <Section>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {new Array(3).fill(2).map((_, idx) => (
            <CardBlog
              key={idx}
              to={""}
              tags={[]}
              title={MOCK}
              desc={MOCK}
              id={""}
              slug={""}
              date={{
                raw: "Nov 20, 2023",
              }}
              author={{
                avatar:
                  "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
                name: "Rizqy Rizqy Rizqy Rizqy",
              }}
              banner={{
                title: "",
                url: "https://images.unsplash.com/photo-1694125398686-fdbce8ca1054?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80",
              }}
              type={"general"}
            />
          ))}
        </div>
      </Section>
    </Layout>
  )
}
export default function () {
  return <Footer />
}
