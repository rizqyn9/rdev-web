import { v2 as cloudinary } from "cloudinary"

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
})

export async function uploadTest() {
  const path = `${process.cwd()}/public/favicons/apple-icon.png`

  console.log("Upload")
  cloudinary.uploader.upload(path).then((val) => {
    console.log(JSON.stringify(val, null, 2))
  })
}
