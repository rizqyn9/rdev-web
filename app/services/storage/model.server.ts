import { Schema } from "mongoose"
import { getModel } from "../db.server.ts"

const DB_STORAGE = "storage"

const storageSchema = new Schema({
  url: { type: String, required: true },
  path: { type: String, required: true },
  title: { type: String, required: true },
  fileId: { type: String, required: true },
})

export const Storage = getModel(DB_STORAGE, storageSchema)
