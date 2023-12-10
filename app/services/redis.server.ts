import Redis, { Redis as RedisClient } from "ioredis"
import { Cache, totalTtl } from "cachified"
import { remember } from "@epic-web/remember"

function redisCacheAdapter(redisCache: RedisClient): Cache {
  return {
    name: redisCache.options.name || "Redis",
    set(key, value) {
      const ttl = totalTtl(value?.metadata)
      if (ttl > 0 && ttl < Infinity) {
        return redisCache.set(key, JSON.stringify(value), "PX", ttl)
      }
      return redisCache.set(key, JSON.stringify(value))
    },
    async get(key) {
      const value = await redisCache.get(key)
      if (!value) {
        return null
      }
      return JSON.parse(value) as Awaited<ReturnType<Cache["get"]>>
    },
    delete(key) {
      return redisCache.del(key)
    },
  }
}

const redis: RedisClient = remember("redis", function () {
  const redis = new Redis.default(process.env.REDIS_URI, {
    retryStrategy(times) {
      return 3000
    },
  })
  const logger = console
  redis
    .on("monitor", (args) => {
      logger.debug("montior", args)
    })
    .on("ready", () => {
      logger.debug("Redis ready")
    })
    .on("error", (e) => {
      logger.debug("Redis error", e)
    })
    .on("close", () => {
      logger.debug("Redis close")
    })
    .on("reconnecting", () => {
      logger.debug("Redis reconnecting")
    })
    .on("end", () => {
      logger.debug("Redis end")
    })
  return redis
})

export { redis, redisCacheAdapter }
