import { useForm, conform } from "@conform-to/react"
import { Form, useLoaderData } from "@remix-run/react"
import { Input } from "~/components/ui/input.tsx"
import { parse } from "@conform-to/zod"
import { Section } from "~/components/ui/layout.tsx"
import { z } from "zod"
import { useState } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { markdown } from "@codemirror/lang-markdown"
import { default as CodeMirror } from "@uiw/react-codemirror"
import { ActionFunctionArgs, json, redirect } from "@remix-run/node"
import { Button } from "~/components/ui/button.tsx"
import { createToastHeaders } from "~/utils/toast.server.ts"
import { handleCreateBlog } from "~/utils/blog/blog.server.ts"
import { getErrorMessage } from "~/utils/error/index.ts"

const inputSchema = z.object({
  content: z.string().min(1),
})

export async function loader() {
  return json({
    content: null,
  })
}

export async function action({ request }: ActionFunctionArgs) {
  try {
    const blog = await handleCreateBlog(request)
    const toastHeaders = await createToastHeaders({
      title: "Success created content",
      description: blog.title,
    })

    return redirect("/cms", { headers: toastHeaders })
  } catch (error) {
    const toastHeaders = await createToastHeaders({
      title: "Error creating content",
      description: getErrorMessage(error),
    })
    return json({ success: false }, { headers: toastHeaders })
  }
}

const TEMPLATE = `---
title: HAHAH
slug: test-mdx-2
desc: This is example description
banner:
  title: Banner
  url: https://creatures.dev/_astro/charts-3.56128dcd_B0Jwd.webp
tags:
  - Test
  - Nodejs
  - React
author:
  name: Rizqy Nugroho
  avatar: https://ik.imagekit.io/connect2203/rdevblog/avatar_PRYh9Z9Bx.png?updatedAt=1701681868075

isFeatured: false
---

This is content`

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const [value, setValue] = useState<string>(loaderData.content || TEMPLATE)
  const [form, field] = useForm({
    onValidate({ formData }) {
      const validated = parse(formData, { schema: inputSchema })
      return validated
    },
  })

  const { content } = field

  return (
    <Section>
      <h1>Test</h1>
      <Form method="POST" {...form.props}>
        <Input type="hidden" {...conform.input(content)} value={value} />
        <ClientOnly>
          {() => (
            // @ts-expect-error
            <CodeMirror
              value={value}
              extensions={[markdown()]}
              theme={dracula}
              height="60vh"
              onChange={(e: string) => setValue(e)}
            />
          )}
        </ClientOnly>

        <Button type="submit" variant={"secondary"}>
          Submit
        </Button>
      </Form>
    </Section>
  )
}
