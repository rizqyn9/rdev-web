import {
  unstable_parseMultipartFormData,
  type ActionFunctionArgs,
  json,
  unstable_createMemoryUploadHandler,
} from "@remix-run/node"
import { useForm, conform } from "@conform-to/react"
import { parse } from "@conform-to/zod"
import { z } from "zod"
import { Form, useActionData } from "@remix-run/react"
import { uploadFileWebToImagekit } from "~/utils/imagekit.server.ts"
import { Input } from "~/components/ui/input.tsx"
import { Button } from "~/components/ui/button.tsx"
import { Label } from "~/components/ui/label.tsx"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "~/components/ui/card.tsx"

const schema = z.object({
  image: z.instanceof(File, { message: "Image is required" }),
  name: z.string().min(1),
})

export async function action({ request }: ActionFunctionArgs) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler()
  )

  const submission = parse(formData, { schema })

  console.log({ submission })

  if (!submission.value) {
    throw new Error("Error")
  }

  const { url } = await uploadFileWebToImagekit({
    file: submission.value.image,
    name: submission.value.name,
  })

  return json({
    url,
  })
}

export default function () {
  const actionData = useActionData<typeof action>()
  const [form, { image, name }] = useForm({
    onValidate({ formData }) {
      return parse(formData, { schema })
    },
  })

  return (
    <div className="w-screen h-screen grid place-content-center">
      <Card className="p-5">
        <CardHeader>
          <CardTitle>Upload Image</CardTitle>
        </CardHeader>
        <CardContent>
          <Form method="POST" encType="multipart/form-data" {...form.props}>
            <Label>Image</Label>
            <Input {...conform.input(image, { type: "file" })} />
            {/* <div>{image.error}</div> */}
            <hr className="my-4" />
            <Label>Name</Label>
            <Input {...conform.input(name)} placeholder="filename" />
            {/* <div>{name.error}</div> */}
            <Button className="mt-8 w-full">Upload</Button>

            {actionData?.url && (
              <a href={actionData.url} target="_blank" rel="noreferrer">
                URL
              </a>
            )}
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
