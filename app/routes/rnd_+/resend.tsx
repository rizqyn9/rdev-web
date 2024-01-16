import { json } from "@remix-run/node"
import { Form } from "@remix-run/react"
import { Button } from "~/components/ui/button.tsx"
import { Layout, Section } from "~/components/ui/layout.tsx"
import { resend } from "~/services/resend.server.ts"

export async function action() {
  const email = await resend.emails.send({
    from: "onboarding@rdev.space",
    to: "rizqynugroho88@gmail.com",
    subject: "Tasyoo",
    html: "<p>Hi sayang <strong>Tasyo</strong>!</p>",
  })

  console.log({ email })

  return json({ success: true })
}

export default function () {
  return (
    <Layout>
      <Section>
        <Form method="post">
          <Button>Send</Button>
        </Form>
      </Section>
    </Layout>
  )
}
