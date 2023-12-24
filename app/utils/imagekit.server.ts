import ImageKit from "imagekit"
import { Storage } from "~/services/storage/model.server.ts"

export const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE,
  publicKey: process.env.IMAGEKIT_PUBLIC,
  urlEndpoint: process.env.IMAGEKIT_URI,
})

type UploadFileWebToImagekit = {
  file: File
  name: string
}

export async function uploadFileWebToImagekit({
  file,
  name,
}: UploadFileWebToImagekit) {
  const buffer = Buffer.from(await file.arrayBuffer())
  const uploaded = await imageKit.upload({
    file: buffer,
    fileName: name,
  })

  await Storage.create({
    url: uploaded.url,
    path: uploaded.filePath,
    title: name,
    fileId: uploaded.fileId,
  })

  return uploaded
}
