"use server"

import { unstable_cache } from "next/cache"
import { PaymentFull } from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { Prisma } from "@prisma/client"
import { SortingState } from "@tanstack/react-table"
import orderBy from "lodash"

export const getPostPaymentsGroupedByPostId = unstable_cache(
  async ({
    fundingSource,
    globalFilter,
    directorFilter,
    startDate,
    endDate,
    sorting,
    page,
    pageSize,
  }: {
    fundingSource: string
    globalFilter?: string
    directorFilter?: string
    startDate?: string
    endDate?: string
    orderBy?: any
    sorting: SortingState
    page: string
    pageSize: string
  }) => {
    const where: Prisma.PaymentWhereInput = {
      postId: {
        not: null,
      },
      fundingSource,
      Post: {
        createdAt: {
          gte: startDate ? new Date(startDate) : undefined,
          lte: endDate ? new Date(endDate) : undefined,
        },
      },
      user: {
        name: { contains: directorFilter, mode: "insensitive" },
      },
      OR: [
        {
          Post: {
            title: { contains: globalFilter, mode: "insensitive" },
          },
        },
        {
          Post: {
            user: { name: { contains: globalFilter, mode: "insensitive" } },
          },
        },
        {
          Post: {
            categories: {
              some: {
                name: {
                  contains: globalFilter,
                  mode: "insensitive",
                },
              },
            },
          },
        },
        {
          user: {
            name: { contains: globalFilter, mode: "insensitive" },
          },
        },
      ],
    }

    // Convert sorting array to Prisma orderBy format
    const orderBy = getOrderBy(sorting)

    // Step 1: Fetch distinct postIds with pagination
    const distinctPostIds = await prisma.payment.findMany({
      orderBy,
      where,
      select: { postId: true },
      distinct: ["postId"],
      skip: parseInt(page) * parseInt(pageSize),
      take: parseInt(pageSize),
    })

    const distinctPostIdsFull = await prisma.payment.findMany({
      where,
      orderBy,
      select: { postId: true },
      distinct: ["postId"],
    })

    const count = distinctPostIdsFull.length

    const postIds = distinctPostIds
      .map((item) => item.postId)
      .filter(Boolean) as string[]

    // Step 2: Fetch payments for these postIds
    const payments = await prisma.payment.findMany({
      where: {
        postId: { in: postIds },
      },
      orderBy,
      include: {
        user: true,
        Post: {
          include: {
            user: true,
            categories: true,
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
      const postId = payment.postId
      if (postId && !acc[postId]) {
        acc[postId] = {
          ...payment,
          amount: 0,
        }
      }
      if (postId) {
        acc[postId].amount += payment.amount
      }
      return acc
    }, {} as Record<string, PaymentFull>)

    // Convert grouped data to an array
    const result = Object.values(groupedData)

    return {
      data: result,
      totalCount: count,
    }
  },
  ["posts"],
  { revalidate: 60, tags: ["postPayments"] }
)

// Function to convert sorting array to Prisma orderBy format
function getOrderBy(
  sorting: SortingState
): Prisma.PaymentOrderByWithRelationInput[] {
  return sorting.reduce((acc, { id, desc }) => {
    if (id === "createdAt") {
      acc.push(
        { Post: { firstPaymentAt: desc ? "desc" : "asc" } },
        { Post: { createdAt: desc ? "desc" : "asc" } }
      )
    } else if (id === "title") {
      acc.push({ Post: { title: desc ? "desc" : "asc" } })
    } else if (id === "director") {
      acc.push({ user: { name: desc ? "desc" : "asc" } })
    } else if (id === "recipient") {
      acc.push({ Post: { user: { name: desc ? "desc" : "asc" } } })
    } else {
      acc.push({ [id]: desc ? "desc" : "asc" })
    }
    return acc
  }, [] as Prisma.PaymentOrderByWithRelationInput[])
}
