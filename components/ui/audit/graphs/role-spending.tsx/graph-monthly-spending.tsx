"use server"

import {
  Spending,
  getSpendingsContent,
  getSpendingsDevelopmentTooling,
  getSpendingsFinders,
  getSpendingsGroupedByRole,
  getSpendingsMarketing,
  getSpendingsNewsletter,
  getSpendingsTeam,
} from "@/actions/get-spending"

import { GraphMonthlySpendingBars } from "./graph-monthly-spending-bars"

// Content Creations (English + Non-Anglo) - $96,200 (We will start with a fixed amount of DOT based on current price, should be adjustable, USDC prices should be converted to DOT at a fix price of $5/DOT (or the amount we decide)), we should always use a disclaimer for the budget allocations.
// Newsletter + Finders Program - $52,000 (Will fix an amount of DOT, which can be updated later.)
// Development + Tooling - $94,500 (Developer, QA and Product Owner, QA, Product Owner, WagTool, Infra, Web Designer, WagTool Maintenance/Bug Squash)
// Marketing - $38,000 (Social Media, Intern, Ads, KaitoAI, Analytics)
// Team - 167,700 (Director, Treasury Management, Designer)

export async function GraphsMonthlySpending({
  oddjobSpending,
  contentSpending,
  newsletterSpending,
  findersSpending,
}: {
  oddjobSpending: Record<string, Spending>
  contentSpending: Record<string, Spending>
  newsletterSpending: Record<string, Spending>
  findersSpending: Record<string, Spending>
}) {
  const spendings = [
    ...Object.entries(oddjobSpending),
    ...Object.entries(contentSpending),
    ...Object.entries(newsletterSpending),
    ...Object.entries(findersSpending),
  ]

  // sum up the spendings, keys might be duplicate, so we need to sum them up
  const chartData: { yearMonth: string; DOT: number; USD: number }[] = []

  for (const [yearMonth, data] of spendings) {
    const existing = chartData.find((item) => item.yearMonth === yearMonth)
    if (existing) {
      existing.DOT += data.DOT
      existing.USD += data.USD
    } else {
      chartData.push({ yearMonth, ...data })
    }
  }

  return (
    <div className="col-span-2">
      <GraphMonthlySpendingBars chartData={chartData} />
    </div>
  )
}
