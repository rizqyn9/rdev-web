import { default as CodeMirror } from "@uiw/react-codemirror"
import { useState } from "react"
import { ClientOnly } from "remix-utils/client-only"
import { markdown } from "@codemirror/lang-markdown"
import { dracula } from "@uiw/codemirror-theme-dracula"
import {
  json,
  type ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node"
import { Input } from "~/components/ui/input.tsx"
import { Button } from "~/components/ui/button.tsx"
import { useForm, conform } from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { Form } from "@remix-run/react"
import { Section } from "~/components/ui/layout.tsx"
import { handleUploadConntent, inputSchema } from "~/utils/cms.ts"
import { createToastHeaders } from "~/utils/toast.server.ts"

export async function loader({ params }: LoaderFunctionArgs) {
  const slug = params.slug as string
  if (!slug) {
    return json({
      mode: "create",
    })
  } else {
    return json({
      mode: "edit",
    })
  }
}

export async function action({ request }: ActionFunctionArgs) {
  const { blog } = await handleUploadConntent(request)
  const toastHeaders = await createToastHeaders({
    title: "Success created content",
    description: blog.title,
  })

  return json(
    {
      blog,
      success: true,
    },
    { headers: toastHeaders }
  )
}

export default function () {
  // const loaderData = useLoaderData<typeof loader>()
  // const { mode } = loaderData
  // const actionData = useActionData<typeof action>()
  const [value, setValue] = useState<string>("## This is markdown")
  const [form, field] = useForm({
    onValidate({ formData }) {
      const validated = parse(formData, { schema: inputSchema })
      return validated
    },
  })

  const {
    slug,
    title,
    desc,
    banner_img,
    banner_title,
    content,
    tags,
    isFeatured,
  } = field

  return (
    <Section>
      <p className="my-5">Editor</p>
      {/* {actionData?.success && (
        <pre>{JSON.stringify(actionData.blog, null, 2)}</pre>
      )} */}
      <Form
        className="flex flex-col gap-5"
        method="POST"
        encType="multipart/form-data"
        {...form.props}
      >
        <Input placeholder="Slug" {...conform.input(slug)} />
        <Input placeholder="Title" {...conform.input(title)} />
        <Input placeholder="Description" {...conform.input(desc)} />
        <Input placeholder="Tags" {...conform.input(tags)} />
        <Input {...conform.input(banner_img, { type: "file" })} />
        <Input placeholder="Banner title" {...conform.input(banner_title)} />
        <Input type="hidden" {...conform.input(content)} value={value} />
        <Input {...conform.input(isFeatured, { type: "checkbox" })} />
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
