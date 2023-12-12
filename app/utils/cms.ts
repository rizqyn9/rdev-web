import { parse } from "@conform-to/zod"
import {
  unstable_createMemoryUploadHandler,
  unstable_parseMultipartFormData,
} from "@remix-run/node"
import { z } from "zod"
import { uploadFileWebToImagekit } from "./imagekit.server.ts"
import { createBlog, editBlog } from "~/services/blog/api/create.server.ts"

export const inputSchema = z.object({
  slug: z.string(),
  title: z.string(),
  desc: z.string(),
  banner_img: z.instanceof(File),
  banner_title: z.string().default(""),
  content: z.string(),
  tags: z.string(),
  isFeatured: z.boolean().default(false),
})

export async function handleCreateConntent(request: Request) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler()
  )

  const submission = parse(formData, { schema: inputSchema })

  if (!submission.value) {
    console.log({ err: submission.error })
    throw new Error("Error")
  }

  const {
    slug,
    title,
    desc,
    banner_img,
    banner_title,
    content,
    tags,
    isFeatured,
  } = submission.value
  const { url } = await uploadFileWebToImagekit({
    file: banner_img,
    name: banner_title,
  })

  const blog = await createBlog({
    slug,
    title,
    desc,
    banner: {
      title: banner_title,
      url,
    },
    content,
    tags: tags
      .split(/,/)
      .map((x) => x.trim())
      .filter(Boolean),
    isFeatured,
  })

  return {
    blog,
  }
}

export const editSchema = z.object({
  content: z.string(),
})

export async function handleEditConntent(request: Request, id: string) {
  const formData = await unstable_parseMultipartFormData(
    request,
    unstable_createMemoryUploadHandler()
  )

  const submission = parse(formData, { schema: editSchema })

  if (!submission.value) {
    console.log({ err: submission.error })
    throw new Error("Error")
  }

  const { content } = submission.value

  const blog = await editBlog({
    content,
    id,
  })

  return {
    blog,
  }
}
