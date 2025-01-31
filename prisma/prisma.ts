import { PrismaClient } from "@prisma/client"

// Validate DATABASE_URL
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set")
}

if (
  !process.env.DATABASE_URL.startsWith("postgresql://") &&
  !process.env.DATABASE_URL.startsWith("postgres://")
) {
  throw new Error(
    "Invalid DATABASE_URL: " +
      process.env.DATABASE_URL +
      ". Must start with postgresql:// or postgres://"
  )
}

let prisma: PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient()
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient()
  }
  prisma = global.prisma
}

export { prisma }
