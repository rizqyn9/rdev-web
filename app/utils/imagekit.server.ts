import ImageKit from "imagekit"

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
  return imageKit.upload({
    file: buffer,
    fileName: name,
  })
}
// export async function uploadToImagekit(body: {
//   data: AsyncIterable<Uint8Array>
//   type: string
// }) {
//   const dataArr: Uint8Array[] = []
//   for await (const x of body.data) {
//     dataArr.push(x)
//   }

//   const file = new File(dataArr, "", {type: body.type})
//   Buffer.from(file)
//   await imageKit.upload({
//     file,
//     fileName: ""
//   })
// }
