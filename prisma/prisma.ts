import { PrismaClient } from "@prisma/client"
import { PrismaClientOptions } from "@prisma/client/runtime/library"
import { withAccelerate } from "@prisma/extension-accelerate"

let prisma: PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === "production") {
  if (process.env.DATABASE_URL?.includes("accelerate")) {
    prisma = new PrismaClient().$extends(
      withAccelerate()
    ) as unknown as PrismaClient
  } else {
    prisma = new PrismaClient()
  }
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma }
