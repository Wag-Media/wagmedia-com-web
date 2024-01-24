import { prisma } from "@/prisma/prisma"

import { AuditTable } from "@/components/ui/audit/audit-table"

export default async function FAQPage() {
  const payments = await prisma.payment.findMany({
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

  return (
    <div>
      <h1 className="text-lg">Audit</h1>
      <AuditTable payments={payments} />
    </div>
  )
}
