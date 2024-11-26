"use server"

import { unstable_cache } from "next/cache"
import { prisma } from "@/prisma/prisma"
import { Prisma } from "@prisma/client"
import { SortingState } from "@tanstack/react-table"

export const getOddjobPaymentsGroupedByPostId = async ({
  fundingSource,
  globalFilter,
  directorFilter,
  startDate,
  endDate,
  page,
  pageSize,
  sorting,
}: {
  fundingSource: string
  globalFilter?: string
  directorFilter?: string
  startDate?: string
  endDate?: string
  orderBy?: any
  page: string
  pageSize: string
  sorting: SortingState
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

  // Convert sorting array to Prisma orderBy format
  const orderBy = getOrderBy(sorting)
  console.log("orderBy", orderBy)

  // Step 1: Fetch distinct postIds with pagination
  const distinctOddjobIds = await prisma.payment.findMany({
    where,
    orderBy,
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

  // Sort the result based on totalAmount
  result.sort((a, b) => {
    const order = sorting.find((s) => s.id === "amount")?.desc ? -1 : 1
    return order * (a.totalAmount - b.totalAmount)
  })

  return {
    data: result,
    totalCount: count,
  }
}

function getOrderBy(
  sorting: SortingState
): Prisma.PaymentOrderByWithRelationInput[] {
  return sorting.reduce((acc, { id, desc }) => {
    if (id === "createdAt") {
      acc.push(
        {
          OddJob: {
            firstPaymentAt: "desc",
          },
        },
        {
          OddJob: {
            createdAt: "desc",
          },
        }
      )
    } else if (id === "description") {
      acc.push({ OddJob: { description: desc ? "desc" : "asc" } })
    } else if (id === "director") {
      acc.push({ OddJob: { manager: { name: desc ? "desc" : "asc" } } })
    } else if (id === "role") {
      acc.push({ OddJob: { role: desc ? "desc" : "asc" } })
    } else if (id === "recipient") {
      acc.push({ OddJob: { User: { name: desc ? "desc" : "asc" } } })
    } else if (id === "amount") {
      acc.push({ OddJob: { requestedAmount: desc ? "desc" : "asc" } })
    } else if (id === "agreedPayment") {
      acc.push({ OddJob: { requestedAmount: desc ? "desc" : "asc" } })
    } else {
      acc.push({ [id]: desc ? "desc" : "asc" })
    }
    return acc
  }, [] as Prisma.PaymentOrderByWithRelationInput[])
}
