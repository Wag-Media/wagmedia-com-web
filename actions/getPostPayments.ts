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
  orderBy: any
  page: string
  pageSize: string
}) {
  return await prisma.payment.findMany({
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
    skip: parseInt(page) * parseInt(pageSize),
    take: parseInt(pageSize),
  })
}
