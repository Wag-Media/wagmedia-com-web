"use server"

import { unstable_cache } from "next/cache"
import { PaymentFull } from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { Prisma } from "@prisma/client"
import orderBy from "lodash"

export const getOddjobPaymentsGroupedByPostId = unstable_cache(
  async ({
    fundingSource,
    globalFilter,
    directorFilter,
    startDate,
    endDate,
    orderBy = [
      {
        OddJob: {
          firstPaymentAt: "desc",
        },
      },
      {
        OddJob: {
          createdAt: "desc",
        },
      },
    ],
    page,
    pageSize,
  }: {
    fundingSource: string
    globalFilter?: string
    directorFilter?: string
    startDate?: string
    endDate?: string
    orderBy?: any
    page: string
    pageSize: string
  }) => {
    const where: Prisma.PaymentWhereInput = {
      oddJobId: {
        not: null,
      },
      fundingSource,
      OddJob: {
        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
        manager: {
          name: { contains: directorFilter, mode: "insensitive" },
        },
      },
      OR: [
        {
          OddJob: {
            description: { contains: globalFilter, mode: "insensitive" },
          },
        },
        {
          OddJob: {
            manager: {
              name: { contains: globalFilter, mode: "insensitive" },
            },
          },
        },
        {
          OddJob: {
            role: { contains: globalFilter, mode: "insensitive" },
          },
        },
        {
          OddJob: {
            User: {
              name: { contains: globalFilter, mode: "insensitive" },
            },
          },
        },
      ],
    }

    // Step 1: Fetch distinct postIds with pagination
    const distinctOddjobIds = await prisma.payment.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
      select: { oddJobId: true },
      distinct: ["oddJobId"],
      skip: parseInt(page) * parseInt(pageSize),
      take: parseInt(pageSize),
    })

    const distinctOddjobIdsFull = await prisma.payment.findMany({
      where,
      orderBy,
      select: { oddJobId: true },
      distinct: ["oddJobId"],
    })

    const count = distinctOddjobIdsFull.length

    const oddJobIds = distinctOddjobIds
      .map((item) => item.oddJobId)
      .filter(Boolean) as string[]

    // Step 2: Fetch payments for these postIds
    const payments = await prisma.payment.findMany({
      where: {
        oddJobId: { in: oddJobIds },
      },
      orderBy,
      include: {
        user: true,
        OddJob: {
          include: {
            User: true,
            manager: true,
            attachments: true,
          },
        },
        reaction: {
          include: {
            user: true,
          },
        },
      },
    })

    // Step 3: Group payments by postId and process
    const groupedData = payments.reduce((acc, payment) => {
      const oddJobId = payment.oddJobId

      if (oddJobId && !acc[oddJobId]) {
        acc[oddJobId] = {
          ...payment,
          amount: 0,
        }
      }
      if (oddJobId) {
        acc[oddJobId].amount += payment.amount
      }
      return acc
    }, {} as Record<string, any>)

    // Convert grouped data to an array
    const result = Object.values(groupedData)

    return {
      data: result,
      totalCount: count,
    }
  },
  ["oddjobs"],
  { revalidate: 60, tags: ["oddjobPayments"] }
)
