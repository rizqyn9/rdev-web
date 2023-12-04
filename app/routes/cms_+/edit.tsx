import { default as CodeMirror } from "@uiw/react-codemirror"
import { useState } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { markdown } from "@codemirror/lang-markdown"
import { dracula } from "@uiw/codemirror-theme-dracula"
import { json, type ActionFunctionArgs } from "@remix-run/node"
import { Input } from "~/components/ui/input.tsx"
import { Button } from "~/components/ui/button.tsx"
import { useForm, conform } from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { Form, useActionData } from "@remix-run/react"
import { blogDto, createBlog } from "~/services/blog/api.ts"
import { z } from "zod"

const schema = blogDto
  .merge(
    z.object({
      tags: z.string(),
    })
  )
  .transform((a) => {
    const tags = a.tags
      .split(/,/)
      .map((x) => x.trim())
      .filter(Boolean)

    console.log({ tags })
    return {
      ...a,
      tags,
    }
  })

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData()
  const submission = parse(formData, { schema })

  if (!submission.value) {
    throw new Error("Error")
  }

  console.log({ a: submission.value })
  const blog = await createBlog(submission.value)

  return json({
    success: true,
    blog,
  })
}

export default function () {
  const actionData = useActionData<typeof action>()
  const [value, setValue] = useState<string>("This is markdown")
  const [form, field] = useForm({
    onValidate({ formData }) {
      const validated = parse(formData, { schema })
      console.log({ validated })
      return validated
    },
    defaultValue: {
      tags: [],
    },
  })

  const { slug, content, title, tags } = field

  return (
    <div className="">
      <p className="my-5">Editor</p>
      {actionData?.success && (
        <pre>{JSON.stringify(actionData.blog, null, 2)}</pre>
      )}
      <Form className="flex flex-col gap-5" method="POST" {...form.props}>
        <Input placeholder="Title" {...conform.input(title)} />
        <Input placeholder="Tags" {...conform.input(tags)} />
        <Input placeholder="Slug" {...conform.input(slug)} />
        <Input type="hidden" {...conform.input(content)} value={value} />
        <div>
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
        </div>

        <Button type="submit" variant={"secondary"}>
          Submit
        </Button>
      </Form>
    </div>
  )
}
