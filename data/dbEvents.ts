import { prisma } from "@/prisma/prisma"

export const getEvents = async ({
  category = "",
  page = 0,
  pageSize = 10,
  fromDate = new Date(),
}: {
  category?: string
  page?: number
  pageSize?: number
  fromDate?: Date
} = {}) => {
  const events = await prisma.polkadotEvent.findMany({
    include: {
      tags: true,
    },
    where: {
      startsAt: {
        gte: fromDate,
      },
      ...(category
        ? {
            tags: {
              some: {
                name: category,
              },
            },
          }
        : {}),
    },
    orderBy: {
      startsAt: "asc",
    },
    skip: page * pageSize,
    take: pageSize,
  })
  return events
}

export const getTotalEvents = async ({
  fromDate,
  category,
}: {
  fromDate: Date
  category?: string
}) => {
  const totalEvents = await prisma.polkadotEvent.count({
    where: {
      startsAt: {
        gte: fromDate,
      },
      ...(category
        ? {
            tags: {
              some: {
                name: category,
              },
            },
          }
        : {}),
    },
  })
  return totalEvents
}

export const getEvent = async (id: string) => {
  const event = await prisma.polkadotEvent.findUnique({ where: { id } })
  return event
}

export const getEventsByMonth = async ({
  month,
  year,
}: {
  month: number
  year: number
}) => {
  const events = await prisma.polkadotEvent.findMany({
    where: {
      startDate: {
        gte: new Date(year, month - 1),
        lt: new Date(year, month),
      },
    },
  })
  return events
}
