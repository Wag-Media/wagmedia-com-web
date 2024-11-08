import { unstable_cache } from "next/cache"
import { prisma } from "@/prisma/prisma"

import { AuditTablePostsDisplay } from "./audit-table-posts-display"

export const getPostPayments = unstable_cache(
  async ({
    where,
    page,
    pageSize,
  }: {
    where: any
    page: string
    pageSize: string
  }) => {
    return await prisma.payment.findMany({
      where,
      orderBy: {
        createdAt: "desc",
      },
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
      skip: parseInt(page) * parseInt(pageSize),
      take: parseInt(pageSize),
    })
  },
  ["posts"],
  { revalidate: 60, tags: ["postPayments"] }
)

export async function AuditTablePosts({
  searchParams,
}: {
  searchParams: {
    fundingSource?: string
    page?: string
    pageSize?: string
  }
}) {
  const {
    fundingSource = "OpenGov-1130",
    page = "0",
    pageSize = "2",
  } = searchParams || {}

  const where: any = {
    postId: {
      not: null,
    },
  }

  // if (startDate) {
  //   where.createdAt = { ...where.createdAt, gte: new Date(startDate) }
  // }
  // if (endDate) {
  //   where.createdAt = { ...where.createdAt, lte: new Date(endDate) }
  // }
  if (fundingSource) {
    where.fundingSource = fundingSource
  }

  const totalCount = await prisma.payment.count({ where })

  const postPayments = await getPostPayments({ where, page, pageSize })

  if (!postPayments) return null

  return (
    <AuditTablePostsDisplay
      postPayments={postPayments}
      totalCount={totalCount}
    />
  )
}
