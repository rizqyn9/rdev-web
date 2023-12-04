import mongoose, {
  Schema,
  model,
  type HydratedDocument,
  type InferSchemaType,
  type PipelineStage,
} from "mongoose"

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

async function checkConnection() {
  return mongoose.connection.readyState
}

function getModel<TSchema extends Schema = any>(name: string, schema: TSchema) {
  function connectModel() {
    return model(name, schema, name)
  }

  type Model = ReturnType<typeof connectModel>

  return ((global.__db ?? null)?.models[name] as Model) || connectModel()
}

export { mongoose, connect, checkConnection, getModel }

type ReturnCreatePipelines = {
  pipelines: PipelineStage[]
}

export function createPipelines(): ReturnCreatePipelines {
  const pipelines: PipelineStage[] = []
  return {
    pipelines,
  }
}

declare global {
  /**
   * @example
   * type C = Hydrated<typeof gameCommunitySchema>
   */

  type Hydrated<Schema> = HydratedDocument<InferSchemaType<Schema>>
}
