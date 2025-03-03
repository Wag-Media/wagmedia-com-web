"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// const chartData = [
//   { role: "WagTool", DOT: 186, USD: 80 },
//   { role: "QA", DOT: 305, USD: 200 },
//   { role: "Product Owner", DOT: 237, USD: 120 },
//   { role: "Developer", DOT: 73, USD: 190 },
//   { role: "QA", DOT: 209, USD: 130 },
//   { role: "Product Owner", DOT: 214, USD: 140 },
// ]

const chartConfig = {
  DOT: {
    label: "DOT",
    color: "hsl(var(--chart-5))",
  },
  USD: {
    label: "USD $",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const

function formatYearMonth(yearMonth: string) {
  const [year, month] = yearMonth.split("-")
  const index = Number(month)
  if (index < 0 || index >= 12) return yearMonth
  return `${MONTHS[index]} ${year}`
}

export function GraphMonthlySpendingBars({
  chartData,
}: {
  chartData: { yearMonth: string; DOT: number; USD: number }[]
}) {
  const firstMonth = chartData[0].yearMonth
  const lastMonth = chartData[chartData.length - 1].yearMonth

  return (
    <Card>
      <CardHeader>
        <CardTitle>Monthly WagMedia Spendings</CardTitle>
        <CardDescription>
          {formatYearMonth(firstMonth)} - {formatYearMonth(lastMonth)}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto max-h-[400px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="yearMonth"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={formatYearMonth}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="DOT" fill="var(--color-DOT)" radius={4} />
            <Bar dataKey="USD" fill="var(--color-USD)" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      {/* <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter> */}
    </Card>
  )
}
