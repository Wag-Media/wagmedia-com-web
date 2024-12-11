import { Spending } from "@/actions/get-spending"

import { ChartConfig } from "@/components/ui/chart"

import { SimplePieChart } from "../simple-pie-chart"

export async function GraphRoleSpendingDetail({
  budget,
  spendingsQuery,
  title,
  description,
}: {
  budget: number
  spendingsQuery: Promise<Spending>
  title: string
  description: string
}) {
  //   const data = [
  //     { name: "test", value: 100, fill: `hsl(var(--chart-${1}))` },
  //     { name: "test2", value: 200, fill: `hsl(var(--chart-${2}))` },
  //   ]

  const spendings = await spendingsQuery

  const coloredData = [
    {
      name: "Available",
      value: budget - spendings.USD,
      fill: `hsl(var(--chart-${2}))`,
    },
    { name: "Spent", value: spendings.USD, fill: `hsl(var(--chart-${4}))` },
  ]

  const chartConfig = {} satisfies ChartConfig

  return (
    <SimplePieChart
      data={coloredData}
      title={title}
      description={description}
      //   chartConfig={chartConfig}
      centerText={`$${budget}`}
      centerTextDescription="Total Budget"
    />
  )
}
