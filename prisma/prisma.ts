import { PrismaClient } from "@prisma/client"
import { PrismaClientOptions } from "@prisma/client/runtime/library"
import { withAccelerate } from "@prisma/extension-accelerate"

let prisma: PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

const options = {
  log: ["query", "info", "warn", "error"] as const,
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  transactionOptions: {
    maxWait: 10000,
    timeout: 60000,
  },
} satisfies PrismaClientOptions

if (process.env.NODE_ENV === "production") {
  if (process.env.DATABASE_URL?.includes("accelerate")) {
    prisma = new PrismaClient(options).$extends(
      withAccelerate()
    ) as unknown as PrismaClient
  } else {
    prisma = new PrismaClient(options)
  }
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient(options)
  }
  prisma = global.prisma
}

export { prisma }
