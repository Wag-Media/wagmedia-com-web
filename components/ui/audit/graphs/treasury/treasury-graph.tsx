"use client"

import * as React from "react"
import { isBoolean } from "lodash"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import { cn } from "@/lib/utils"
import { useTreasuryData } from "@/hooks/useTreasuryData"
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
import { Skeleton } from "@/components/ui/skeleton"

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

export function TreasuryGraph() {
  const { data: treasuries, isLoading, isError } = useTreasuryData()

  const treasuryUrls = [
    treasuries?.treasuryAH.url,
    treasuries?.treasuryPolkadot.url,
    treasuries?.multisigPolkadot.url,
    treasuries?.hydra.url,
    treasuries?.eth.mainnet.url,
    treasuries?.eth.base.url,
  ].filter((t) => typeof t !== undefined)

  const coloredData = [
    {
      label: "ethMainnet",
      value: treasuries?.eth?.mainnet?.totalUSD || 0,
      fill: "hsl(var(--chart-1))",
    },
    {
      label: "ethBase",
      value: treasuries?.eth?.base?.totalUSD || 0,
      fill: "hsl(var(--chart-2))",
    },
    {
      label: "wagmediaTreasury",
      value:
        (treasuries?.treasuryAH?.totalUSD || 0) +
        (treasuries?.treasuryPolkadot?.totalUSD || 0),
      fill: "hsl(var(--chart-3))",
    },
    {
      label: "wagmediaMultisig",
      value:
        (treasuries?.multisigAH?.totalUSD || 0) +
        (treasuries?.multisigPolkadot?.totalUSD || 0),
      fill: "hsl(var(--chart-4))",
    },
    {
      label: "hydraOmnipool",
      value: treasuries?.hydra?.totalUSD || 0,
      fill: "hsl(var(--chart-5))",
    },
  ]

  const chartConfig = {
    ethMainnet: {
      label: `ETH Mainnet: $${
        treasuries?.eth?.mainnet?.totalUSD?.toFixed(0) || 0
      }`,
    },
    ethBase: {
      label: `Base: $${treasuries?.eth?.base?.totalUSD?.toFixed(0) || 0}`,
    },
    wagmediaTreasury: {
      label: `WagMedia Treasury: $${(
        (treasuries?.treasuryAH?.totalUSD || 0) +
        (treasuries?.treasuryPolkadot?.totalUSD || 0)
      ).toFixed(0)}`,
    },
    wagmediaMultisig: {
      label: `WagMedia Multisig: $${(
        (treasuries?.multisigAH?.totalUSD || 0) +
        (treasuries?.multisigPolkadot?.totalUSD || 0)
      ).toFixed(0)}`,
    },
    hydraOmnipool: {
      label: `Hydra Omnipool: $${treasuries?.hydra?.totalUSD?.toFixed(0) || 0}`,
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col col-span-2">
      <CardHeader className="items-center pb-0">
        <CardTitle>WagMedia Treasury Holdings</CardTitle>
        <CardDescription>
          Last Update {treasuries?.currentTime.toLocaleString()}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        {isLoading ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <Skeleton className="w-40 h-40 rounded-full" />
          </div>
        ) : isError ? (
          <div className="h-[300px] w-full flex items-center justify-center">
            <p className="text-sm text-red-400">
              Error fetching treasury data, try reloading the page
            </p>
          </div>
        ) : (
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[400px]"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    formatter={(value, name) =>
                      `${chartConfig[name as keyof typeof chartConfig].label}`
                    }
                  />
                }
              />
              <Pie
                data={coloredData}
                dataKey="value"
                nameKey="label"
                innerRadius={80}
                outerRadius={130}
                strokeWidth={2}
                labelLine={false}
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
                            className="text-lg font-bold fill-foreground"
                          >
                            ${treasuries?.totalUSD.toFixed(0)}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                            Total Treasury
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
              <ChartLegend content={<ChartLegendContent />} />
            </PieChart>
          </ChartContainer>
        )}
      </CardContent>
      <CardFooter className="flex-col gap-2 mt-2 text-sm text-center">
        <p className="text-xs leading-none text-muted-foreground">
          The total treasury amount might deviate from the actual amount due to
          the use of different prices for each asset. For more accurate values,
          please refer to the detailed breakdown in block explorers:{" "}
          {treasuryUrls.map((url, index: number) => (
            <a
              key={index}
              href={url.replace(".api.subscan.io", ".subscan.io")}
              target="_blank"
              rel="noreferrer"
              className={cn("text-cyan-600 after:content-['|'] after:mx-1", {
                "after:content-none": index === 5,
              })}
            >
              {index + 1}
            </a>
          ))}
        </p>
      </CardFooter>
    </Card>
  )
}
