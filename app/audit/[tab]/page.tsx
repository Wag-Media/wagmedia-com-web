import { Suspense } from "react"
import {
  PaymentFull,
  PaymentWithUser,
  PostWithUserAndCategories,
} from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { Payment, Post } from "@prisma/client"

import { PaymentOddjob } from "@/types/prisma"
import { cn } from "@/lib/utils"
import { AuditTableOddjobs } from "@/components/ui/audit/audit-table-oddjobs"
import { AuditTablePosts } from "@/components/ui/audit/audit-table-posts"
import Heading from "@/components/Heading/Heading"

export const fetchCache = "force-no-store"
export const revalidate = 0 // seconds
export const dynamic = "force-dynamic"

export default async function AuditPage({
  params,
}: {
  params: { tab: string }
}) {
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

  const oddjobPayments = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
    },
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

  console.log("groupedByPostId", groupedByPostId)

  const tabs = ["Posts", "Management"]
  if (!tabs.map((t) => t.toLowerCase()).includes(params.tab)) {
    return <div>Invalid tab</div>
  }

  return (
    <div>
      <Heading desc="See where all the payments go">Audit</Heading>
      <div className="mb-12">
        {tabs.map((tab) => (
          <a
            key={tab}
            href={`/audit/${tab.toLowerCase()}`}
            className={cn(
              "py-2 !mr-4 text-3xl font-semibold border-b-4 rounded-none cursor-pointer",
              {
                "border-black": tab.toLowerCase() === params.tab,
                "border-transparent": tab.toLowerCase() !== params.tab,
              }
            )}
          >
            {tab}
          </a>
        ))}
      </div>
      {params.tab === "posts" && (
        <Suspense fallback={<div>Loading...</div>}>
          <AuditTablePosts postPayments={groupedPaymentsArray} />
        </Suspense>
      )}
      {params.tab === "management" && (
        <Suspense fallback={<div>Loading...</div>}>
          <AuditTableOddjobs oddjobPayments={oddjobPayments} />
        </Suspense>
      )}

      {/* <h2 className="">{params.tab}</h2>



      <AuditTablePosts postPayments={groupedPaymentsArray} />

      <h2>Odd Job Payments</h2>
      <AuditTableOddjobs oddjobPayments={oddjobPayments} /> */}
    </div>
  )
}
