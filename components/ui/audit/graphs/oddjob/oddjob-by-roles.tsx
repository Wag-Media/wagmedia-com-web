"use client"

import * as React from "react"
import { Label, Pie, PieChart } from "recharts"

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export function OddjobByRoles({
  totalOddJobPayments,
}: {
  totalOddJobPayments: any
}) {
  const totalPayments = totalOddJobPayments.data.sort(
    (a: any, b: any) => b.USD - a.USD
  )

  const coloredData = totalPayments.map((p: any, index: number) => ({
    ...p,
    label: p.role,
    fill: `hsl(var(--chart-${(index + 1) % 10}))`,
  }))

  const chartConfig = totalPayments.reduce((acc: any, p: any) => {
    acc[p.role] = {
      label: p.role,
    }
    return acc
  }, {}) satisfies ChartConfig

  // console.log("coloredData", coloredData)

  return (
    <>
      {/* <Card className="flex flex-col p-2 text-xs">
        <pre>{JSON.stringify(totalOddJobPayments, null, 2)}</pre>
      </Card> */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>WagMedia Oddjob Payments by Role</CardTitle>
          <CardDescription>
            {totalOddJobPayments.firstSpent.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}{" "}
            -{" "}
            {totalOddJobPayments.lastSpent.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={coloredData}
                dataKey="USD"
                nameKey="role"
                innerRadius={60}
                outerRadius={110}
                strokeWidth={2}
              >
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="text-xl font-bold fill-foreground"
                          >
                            ${totalOddJobPayments.total.USD}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Spent
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend
                content={<ChartLegendContent />}
                // className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        {/* <CardFooter className="flex-col gap-2 text-sm">
          <div className="flex items-center gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="w-4 h-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
          </div>
        </CardFooter> */}
      </Card>
    </>
  )
}
