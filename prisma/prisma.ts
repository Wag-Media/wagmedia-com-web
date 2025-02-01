import { PrismaClient } from "@prisma/client"

// Validate DATABASE_URL

let prisma: PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV)

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma }
