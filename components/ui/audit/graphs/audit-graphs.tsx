import { Suspense } from "react"
import Link from "next/link"
import {
  getSpendingsContent,
  getSpendingsFinders,
  getSpendingsNewsletter,
} from "@/actions/get-spending"
import { getOddjobPaymentsByRole } from "@/actions/getOddjobPayments"
import { getTreasuries } from "@/actions/getTreasuryHistory"
import { getTreasuryValues } from "@/actions/getTreasuryValues"
import { name } from "country-emoji"

import { Skeleton } from "../../skeleton"
import { OddjobByRoles } from "./oddjob/oddjob-by-roles"
import { GraphsRoleSpending } from "./role-spending.tsx/graph-role-spending"
import { SimplePieChart } from "./simple-pie-chart"
import { TreasuryGraph } from "./treasury/treasury-graph"

export const revalidate = 43200 // 12 hours

export default async function PageAuditCharts() {
  // const treasuries = await getTreasuryValues()
  const totalOddJobPayments = await getOddjobPaymentsByRole()
  const [spendingsContent, spendingsNewsletter, spendingsFinders] =
    await Promise.all([
      getSpendingsContent(),
      getSpendingsNewsletter(),
      getSpendingsFinders(),
    ])

  const chartDataContent = [
    {
      name: "Content",
      value: spendingsContent.DOT,
      fill: `hsl(var(--chart-${1}))`,
    },
    {
      name: "Newsletter",
      value: spendingsNewsletter.DOT,
      fill: `hsl(var(--chart-${2}))`,
    },
    {
      name: "Finders",
      value: spendingsFinders.DOT,
      fill: `hsl(var(--chart-${3}))`,
    },
  ]

  const totalContentSpent = chartDataContent.reduce(
    (acc, item) => acc + item.value,
    0
  )

  return (
    <div>
      <p className="mb-4 text-lg text-center">
        Statistics of the current WagMedia Spending funded in{" "}
        <Link
          href="https://polkadot.subsquare.io/referenda/1130"
          className="text-primary-500"
        >
          Referendum #1130
        </Link>
      </p>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <TreasuryGraph />
        <SimplePieChart
          data={chartDataContent}
          title="WagMedia Content Spending (DOT)"
          description={`October 2024 - ${new Date().toLocaleString("default", {
            month: "long",
            year: "numeric",
          })}`}
          centerText={`${totalContentSpent.toFixed(2)} DOT`}
          centerTextDescription="Total Spent"
        />
        <OddjobByRoles totalOddJobPayments={totalOddJobPayments} />
        <Suspense
          fallback={
            <div className="h-[300px] w-full flex items-center justify-center">
              <Skeleton className="h-[300px]" />
            </div>
          }
        >
          <GraphsRoleSpending />
        </Suspense>
      </div>
    </div>
  )
}
