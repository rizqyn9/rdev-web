import { default as CodeMirror } from "@uiw/react-codemirror"
import { useState } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { markdown } from "@codemirror/lang-markdown"
import { dracula } from "@uiw/codemirror-theme-dracula"
import {
  json,
  type ActionFunctionArgs,
  LoaderFunctionArgs,
  redirect,
} from "@remix-run/node"
import { Input } from "~/components/ui/input.tsx"
import { Button } from "~/components/ui/button.tsx"
import { useForm, conform } from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { Form, useLoaderData } from "@remix-run/react"
import { Section } from "~/components/ui/layout.tsx"
import { createToastHeaders } from "~/utils/toast.server.ts"
import { findBlog } from "~/services/blog/api/details.ts"
import { handleEditBlog, inputSchema } from "~/utils/blog/blog.server.ts"

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug as string
  const blog = await findBlog({ id: slug })
  return json({
    mode: "edit",
    slug,
    content: blog.content,
  })
}

export async function action({ request, params }: ActionFunctionArgs) {
  const id = params.slug as string
  const blog = await handleEditBlog(id, request)
  const toastHeaders = await createToastHeaders({
    title: "Success edit content",
    description: blog.title,
  })

  return redirect("/cms", { headers: toastHeaders })
}

export default function () {
  const loaderData = useLoaderData<typeof loader>()
  const { slug: editedSlug } = loaderData
  const [value, setValue] = useState<string>(loaderData.content)
  const [form, field] = useForm({
    onValidate({ formData }) {
      const validated = parse(formData, { schema: inputSchema })
      return validated
    },
    defaultValue: {
      content: loaderData.content,
    },
  })

  const { content } = field

  return (
    <Section>
      <p className="my-5">Editor {editedSlug}</p>
      <Form
        className="flex flex-col gap-5"
        method="POST"
        encType="multipart/form-data"
        {...form.props}
      >
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
