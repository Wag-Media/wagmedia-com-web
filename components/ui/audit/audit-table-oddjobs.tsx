import { prisma } from "@/prisma/prisma"

import { AuditTableOddjobsDisplay } from "./audit-table-oddjobs-display"

export async function AuditTableOddjobs() {
  const oddjobPayments = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
      fundingSource: {
        equals: "OpenGov-1130",
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
