"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  total: {
    label: "Total USD Amount",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

const usdcChartConfig = {
  treasury1: {
    label: "WagMedia Treasury",
    color: "hsl(var(--chart-1))",
  },
  treasury2: {
    label: "WagMedia Multisig",
    color: "hsl(var(--chart-2))",
  },
  treasury3: {
    label: "WagMedia Treasury - EVM",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

type TreasuryGraphProps = {
  usdcTotal: {
    treasury1: number
    treasury2: number
    treasury3: number
    date: string
  }[]
}

export default function TreasuryGraph({ usdcTotal }: TreasuryGraphProps) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("total")

  const amounts = React.useMemo(
    () => ({
      total: Number(
        Number(usdcTotal[usdcTotal.length - 1].treasury1) +
          Number(usdcTotal[usdcTotal.length - 1].treasury2) +
          Number(usdcTotal[usdcTotal.length - 1].treasury3)
      ).toFixed(2),
      mobile: 0,
    }),
    []
  )

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch p-0 space-y-0 border-b sm:flex-row">
        <div className="flex flex-col justify-center flex-1 gap-1 px-6 py-5 sm:py-6">
          <CardTitle>WagMedia Treasury</CardTitle>
          <CardDescription>
            Showing total amount in treasury for the last 6 months
          </CardDescription>
        </div>
        <div className="flex">
          {["total"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  ${amounts[key as keyof typeof amounts].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={usdcChartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={usdcTotal}
            margin={{
              left: 24,
              right: 36,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              //   axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[200px]"
                  nameKey="date"
                  formatter={(value, name, item) => (
                    <div className="flex flex-row items-center gap-2">
                      <span
                        className="block w-2 h-2 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <div className="flex flex-col">
                        <span>
                          {
                            usdcChartConfig[
                              name as keyof typeof usdcChartConfig
                            ].label
                          }
                        </span>
                        <span>${Number(value).toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                  labelFormatter={(value, payload) => {
                    return (
                      new Date(value).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      }) +
                      "\n$" +
                      Object.values(payload)
                        .reduce((acc, curr) => {
                          return acc + Number(curr.value)
                        }, 0)
                        .toFixed(2)
                    )
                  }}
                />
              }
            />
            <Line
              dataKey="treasury1"
              type="monotone"
              stroke={usdcChartConfig.treasury1.color}
              strokeWidth={3}
              dot={false}
              label="tets"
            />
            <Line
              dataKey="treasury2"
              type="monotone"
              stroke={usdcChartConfig.treasury2.color}
              strokeWidth={3}
              dot={false}
            />
            <Line
              dataKey="treasury3"
              type="monotone"
              stroke={usdcChartConfig.treasury3.color}
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      {/* <pre>{JSON.stringify(usdcTotal, null, 2)}</pre> */}
    </Card>
  )
}
