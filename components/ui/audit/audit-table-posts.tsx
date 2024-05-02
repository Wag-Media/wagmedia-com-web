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

  interface GroupedData {
    [postId: string]: {
      payments: PaymentWithUser[]
      post: PostWithUserAndCategories | null
    }
  }

  const groupedByPostId: GroupedData = {}

  postPayments.forEach((payment) => {
    if (payment) {
      const postId = payment.postId
      if (postId) {
        if (!groupedByPostId[postId]) {
          groupedByPostId[postId] = {
            post: payment.Post,
            payments: [],
          }
        }
        groupedByPostId[postId].payments.push(payment)
      }
    }
  })

  // Convert grouped data into an array for the UI component
  const groupedPaymentsArray = Object.values(groupedByPostId).flat()

  return <AuditTablePostsDisplay postPayments={groupedPaymentsArray} />
}
