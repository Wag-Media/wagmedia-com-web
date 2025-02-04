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
      isPublished: true,
      OR: [
        // Non-recurring events
        {
          startsAt: {
            gte: fromDate,
          },
          recurrencePattern: null,
        },
        // Recurring events - include both current and future recurring events
        {
          AND: [
            {
              OR: [
                // Include recurring events that have already started
                { startsAt: { lte: fromDate } },
                // Include recurring events that will start in the future
                { startsAt: { gte: fromDate } },
              ],
            },
            {
              OR: [
                { recurrenceEndDate: { gte: fromDate } },
                { recurrenceEndDate: null },
              ],
            },
            { recurrencePattern: { not: null } },
          ],
        },
      ],
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

export const getEventCategories = async (fromDate: Date) => {
  const categories = await prisma.polkadotEvent.findMany({
    where: {
      startsAt: {
        gte: fromDate,
      },
    },
    select: {
      tags: true,
    },
  })
  return categories.map((event) => event.tags.map((tag) => tag.name))
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
      isPublished: true,
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
      isPublished: true,
      startDate: {
        gte: new Date(year, month - 1),
        lt: new Date(year, month),
      },
    },
  })
  return events
}
