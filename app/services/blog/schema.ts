import { z } from "zod"
import { dateFormatEn } from "~/utils/date.ts"

export const blogDto = z.object({
  slug: z.string(),
  title: z.string(),
  desc: z.string(),
  banner: z.object({
    url: z.string(),
    title: z.string(),
  }),
  content: z.string(),
  tags: z.array(z.string()),
  isFeatured: z.boolean(),
  view: z.number(),
  like: z.number(),
  author: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
})

export type BlogDto = z.infer<typeof blogDto>

export const blogPreviewSchema = z.object({
  id: z.coerce.string(),
  title: z.string(),
  slug: z.string(),
  desc: z
    .string()
    .min(1)
    .catch(
      "On the ever-evolving generalist/full-stack role and to what extent does it make sense to broaden your skillset."
    ),
  tags: z
    .array(z.string())
    .catch(["React", "Nodejs", "Nodejs2", "Nodejs1", "Nodejs3", "Nodejs4"]),
  date: z.coerce.date().transform((x) => {
    const raw = dateFormatEn(x)
    return { raw }
  }),
  author: z.object({
    name: z.string(),
    avatar: z.string(),
  }),
  banner: z.object({
    title: z.string(),
    url: z.string(),
  }),
})

export type BlogPreview = z.infer<typeof blogPreviewSchema>
