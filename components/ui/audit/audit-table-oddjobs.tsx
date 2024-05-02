import { PaymentWithUser, PostWithUserAndCategories } from "@/data/types"
import { prisma } from "@/prisma/prisma"

import { AuditTableOddjobsDisplay } from "./audit-table-oddjobs-display"

export async function AuditTableOddjobs() {
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

  return <AuditTableOddjobsDisplay oddjobPayments={oddjobPayments} />
}
