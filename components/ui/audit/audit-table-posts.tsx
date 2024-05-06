import { PaymentWithUser, PostWithUserAndCategories } from "@/data/types"
import { prisma } from "@/prisma/prisma"

import { AuditTablePostsDisplay } from "./audit-table-posts-display"

export async function AuditTablePosts() {
  const postPayments = await prisma.payment.findMany({
    where: {
      postId: {
        not: null,
      },
      // createdAt: {
      //   gte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30), // 30 days
      // },
    },
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
  })

  if (!postPayments) return null

  return <AuditTablePostsDisplay postPayments={postPayments} />
}
