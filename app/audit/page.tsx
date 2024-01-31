import { prisma } from "@/prisma/prisma"

import { PaymentOddjob } from "@/types/prisma"
import { AuditTableOddjobs } from "@/components/ui/audit/audit-table-oddjobs"
import { AuditTablePosts } from "@/components/ui/audit/audit-table-posts"

export const fetchCache = "force-no-store"
export const revalidate = 0 // seconds
export const dynamic = "force-dynamic"

export default async function AuditPage() {
  const postPayments = await prisma.payment.findMany({
    where: {
      postId: {
        not: null,
      },
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
        },
      },
      reaction: {
        include: {
          user: true,
        },
      },
    },
  })

  return (
    <div>
      <h1 className="text-lg">Audit</h1>
      <h2>Post Payments</h2>
      <AuditTablePosts postPayments={postPayments} />

      <h2>Odd Job Payments</h2>
      <AuditTableOddjobs oddjobPayments={oddjobPayments} />
    </div>
  )
}
