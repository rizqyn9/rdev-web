import mongoose from "mongoose"

let db: typeof mongoose

declare global {
  var __db: typeof mongoose
}

async function connect() {
  if (db) return db

  if (process.env.NODE_ENV === "production") {
    db = await mongoose.connect(process.env.MONGO_URI as string)
  } else {
    // in development, need to store the db connection in a global variable
    // this is because the dev server purges the require cache on every request
    // and will cause multiple connections to be made
    if (!global.__db) {
      global.__db = await mongoose.connect(process.env.MONGO_URI as string)
    }
    db = global.__db
  }
  console.log("Success connected to database")
  return db
}

export { mongoose, connect }
