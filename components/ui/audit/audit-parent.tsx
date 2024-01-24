"use server"

import prisma from "@/prisma/prisma"

import { AuditTable } from "./audit-table"

export async function AuditParent() {
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

  return <AuditTable payments={payments} />
}
