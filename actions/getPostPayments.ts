"use server"

import { prisma } from "@/prisma/prisma"

export async function getPostPayments({
  where,
  orderBy = {
    createdAt: "desc",
  },
  page,
  pageSize,
}: {
  where: any
  orderBy?: any
  page: string
  pageSize: string
}) {
  const query = {
    where,
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
  }

  const data = await prisma.payment.findMany({
    ...query,
    skip: parseInt(page) * parseInt(pageSize),
    take: parseInt(pageSize),
  })

  const totalCount = await prisma.payment.count({ where })
  return {
    data,
    totalCount,
  }
}
