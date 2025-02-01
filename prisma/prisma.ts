import { PrismaClient } from "@prisma/client"

// Validate DATABASE_URL

let prisma: PrismaClient
declare global {
  var prisma: PrismaClient | undefined
}

console.log("process.env.NODE_ENV", process.env.NODE_ENV)

const prismaClientSingleton = () => {
  return new PrismaClient({
    log: ["error"],
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  })
}

if (process.env.NODE_ENV === "production") {
  prisma = prismaClientSingleton()
} else {
  if (!global.prisma) {
    global.prisma = prismaClientSingleton()
  }
  prisma = global.prisma
}

// Ensure connections are properly closed when the app is shutting down
process.on("beforeExit", async () => {
  console.log("Disconnecting from Prisma")
  await prisma.$disconnect()
})

export { prisma }
