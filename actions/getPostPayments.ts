"use server"

import { unstable_cache } from "next/cache"
import { PaymentFull } from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { Prisma } from "@prisma/client"

export const getPostPaymentsGroupedByPostId = unstable_cache(
  async ({
    fundingSource,
    globalFilter,
    directorFilter,
    startDate,
    endDate,
    orderBy = {
      createdAt: "desc",
    },
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

    // Step 1: Fetch distinct postIds with pagination
    const distinctPostIds = await prisma.payment.findMany({
      where,
      orderBy,
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
