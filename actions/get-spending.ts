import { prisma } from "@/prisma/prisma"

import { OddJobRole } from "../types/oddjob-roles"

// Content Creations (English + Non-Anglo) - $96,200 (We will start with a fixed amount of DOT based on current price, should be adjustable, USDC prices should be converted to DOT at a fix price of $5/DOT (or the amount we decide)), we should always use a disclaimer for the budget allocations.
// Newsletter + Finders Program - $52,000 (Will fix an amount of DOT, which can be updated later.)
// Development + Tooling - $94,500 (Developer, QA and Product Owner, QA, Product Owner, WagTool, Infra, Web Designer, WagTool Maintenance/Bug Squash)
// Marketing - $38,000 (Social Media, Intern, Ads, KaitoAI, Analytics)
// Team - 167,700 (Director, Treasury Management, Designer)

export interface Spending {
  DOT: number
  USD: number
}

export async function getSpendingsGroupedByRole(): Promise<
  { role: string; USD: number; DOT: number }[]
> {
  const res = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
      fundingSource: "OpenGov-1130",
    },
    include: {
      OddJob: true,
    },
  })

  const groupedSpendings = res.reduce((acc, payment) => {
    const role = payment.OddJob!.role
    if (!acc[role]) {
      acc[role] = { role, USD: 0, DOT: 0 }
    }
    if (payment.unit === "DOT") {
      acc[role].DOT += payment.amount
    } else if (payment.unit === "USD") {
      acc[role].USD += payment.amount
    }
    return acc
  }, {} as Record<string, { role: string; USD: number; DOT: number }>)

  return Object.values(groupedSpendings)
}

/**
 * Get all spendings in the content creations, which is all post payments
 * @returns
 */
export async function getSpendingsContent(): Promise<{
  total: Spending
  byMonth: Record<string, Spending>
}> {
  const res = await prisma.payment.findMany({
    where: {
      postId: {
        not: null,
      },
      fundingSource: "OpenGov-1130",
      Post: {
        contentType: "article",
      },
    },
  })

  const total = res.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    { DOT: 0, USD: 0 }
  )

  const byMonth = res.reduce((acc, payment) => {
    const year = payment.createdAt.getFullYear()
    const month = payment.createdAt.getMonth()
    const currency = payment.unit as "DOT" | "USD"
    acc[`${year}-${month}`] = {
      ...(acc[`${year}-${month}`] || { DOT: 0, USD: 0 }),
      [currency]: (acc[`${year}-${month}`]?.[currency] || 0) + payment.amount,
    }
    return acc
  }, {} as Record<string, Spending>)

  return {
    total,
    byMonth,
  }
}

export async function getSpendingsFinders(): Promise<{
  total: Spending
  byMonth: Record<string, Spending>
}> {
  const findersPayments = await prisma.payment.findMany({
    where: {
      fundingSource: "OpenGov-1130",
      Post: {
        contentType: "news",
      },
    },
  })

  const totalFinders = findersPayments.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    { DOT: 0, USD: 0 }
  )

  const byMonth = findersPayments.reduce((acc, payment) => {
    const year = payment.createdAt.getFullYear()
    const month = payment.createdAt.getMonth()
    const currency = payment.unit as "DOT" | "USD"
    acc[`${year}-${month}`] = {
      ...(acc[`${year}-${month}`] || { DOT: 0, USD: 0 }),
      [currency]: (acc[`${year}-${month}`]?.[currency] || 0) + payment.amount,
    }
    return acc
  }, {} as Record<string, Spending>)

  return {
    total: totalFinders,
    byMonth,
  }
}

export async function getSpendingsNewsletter(): Promise<{
  total: Spending
  byMonth: Record<string, Spending>
}> {
  const newsletterPosts = await prisma.post.findMany({
    where: {
      categories: {
        some: {
          name: "Newsletter",
        },
      },
    },
  })

  const newletterIds = newsletterPosts.map((post) => post.id)

  const totalNewsletter = await prisma.payment.findMany({
    where: {
      fundingSource: "OpenGov-1130",
      threadParentId: {
        in: newletterIds,
      },
    },
  })

  const total = totalNewsletter.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    {
      DOT: 0,
      USD: 0,
    }
  )

  const byMonth = totalNewsletter.reduce((acc, payment) => {
    const year = payment.createdAt.getFullYear()
    const month = payment.createdAt.getMonth()
    const currency = payment.unit as "DOT" | "USD"
    acc[`${year}-${month}`] = {
      ...(acc[`${year}-${month}`] || { DOT: 0, USD: 0 }),
      [currency]: (acc[`${year}-${month}`]?.[currency] || 0) + payment.amount,
    }
    return acc
  }, {} as Record<string, Spending>)

  return {
    total,
    byMonth,
  }
}

// Development + Tooling - $94,500 (Developer, QA and Product Owner, QA, Product Owner, WagTool, Infra, Web Designer, WagTool Maintenance/Bug Squash)
export async function getSpendingsDevelopmentTooling(): Promise<Spending> {
  const roleFilter = [
    "developer",
    "qa_and_product_owner",
    "qa",
    "product_owner",
    "wagtool",
    "infra",
    "web_designer",
  ]

  const res = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
      fundingSource: "OpenGov-1130",
      OddJob: {
        role: {
          in: roleFilter,
        },
      },
    },
  })

  const total = res.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    { DOT: 0, USD: 0 }
  )

  return total
}

export async function getSpendingsMarketing(): Promise<Spending> {
  const roleFilter = ["ads", "kaitoai", "analytics"]

  const res = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
      fundingSource: "OpenGov-1130",
      OddJob: {
        role: {
          in: roleFilter,
        },
      },
    },
  })

  const total = res.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    { DOT: 0, USD: 0 }
  )

  return total
}

export async function getSpendingsTeam(): Promise<Spending> {
  const roleFilter = [
    "director",
    "treasury_management",
    "designer",
    "social_media",
    "intern",
  ]

  const res = await prisma.payment.findMany({
    where: {
      oddJobId: {
        not: null,
      },
      fundingSource: "OpenGov-1130",
      OddJob: {
        role: {
          in: roleFilter,
        },
      },
    },
  })

  const total = res.reduce(
    (acc, payment) => {
      if (payment.unit === "DOT") {
        acc.DOT += payment.amount
      } else if (payment.unit === "USD") {
        acc.USD += payment.amount
      }
      return acc
    },
    { DOT: 0, USD: 0 }
  )

  return total
}
