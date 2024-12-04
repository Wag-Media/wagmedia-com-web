"use client"

import * as React from "react"
import { TrendingUp } from "lucide-react"
import { Label, Pie, PieChart } from "recharts"

import { cn } from "@/lib/utils"
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

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 287, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 190, fill: "var(--color-other)" },
]

// const chartConfig = {
//   Developer: {
//     label: "Developer",
//   },
//   Chrome: {
//     label: "Chrome",
//   },
//   safari: {
//     label: "Safari",
//     color: "hsl(var(--chart-2))",
//   },
//   firefox: {
//     label: "Firefox",
//     color: "hsl(var(--chart-3))",
//   },
//   edge: {
//     label: "Edge",
//     color: "hsl(var(--chart-4))",
//   },
//   other: {
//     label: "Other",
//     color: "hsl(var(--chart-5))",
//   },
// } satisfies ChartConfig

export function TreasuryGraph({ treasuries }: { treasuries: any }) {
  // const totalAmounts = treasuries.data.sort((a: any, b: any) => b.USD - a.USD)

  // const coloredData = totalPayments.map((p: any, index: number) => ({
  //   ...p,
  //   label: p.role,
  //   fill: `hsl(var(--chart-${(index + 1) % 10}))`,
  // }))

  // const chartConfig = totalPayments.reduce((acc: any, p: any) => {
  //   acc[p.role] = {
  //     label: p.role,
  //   }
  //   return acc
  // }, {}) satisfies ChartConfig

  // console.log("coloredData", coloredData)

  const coloredData = [
    {
      label: "ethMainnet",
      value: treasuries.eth?.mainnet?.totalUSD || 0,
      fill: "hsl(var(--chart-1))",
    },
    {
      label: "ethBase",
      value: treasuries.eth?.base?.totalUSD || 0,
      fill: "hsl(var(--chart-2))",
    },
    {
      label: "wagmediaTreasury",
      value:
        (treasuries.treasuryAH?.totalUSD || 0) +
        (treasuries.treasuryPolkadot?.totalUSD || 0),
      fill: "hsl(var(--chart-3))",
    },
    {
      label: "wagmediaMultisig",
      value: treasuries.multisigAH?.totalUSD || 0,
      fill: "hsl(var(--chart-4))",
    },
    {
      label: "hydraOmnipool",
      value: treasuries.hydra?.totalUSD || 0,
      fill: "hsl(var(--chart-5))",
    },
  ]

  const chartConfig = {
    ethMainnet: {
      label: "ETH Mainnet",
    },
    ethBase: {
      label: "Base",
    },
    wagmediaTreasury: {
      label: "WagMedia Treasury",
    },
    wagmediaMultisig: {
      label: "WagMedia Multisig",
    },
    hydraOmnipool: {
      label: "Hydra Omnipool",
    },
  } satisfies ChartConfig

  return (
    <>
      {/* <Card className="flex flex-col p-2 text-xs">
        <pre>{JSON.stringify(coloredData, null, 2)}</pre>
      </Card> */}
      <Card className="flex flex-col">
        <CardHeader className="items-center pb-0">
          <CardTitle>WagMedia Treasury Holdings</CardTitle>
          <CardDescription>
            Last Update {treasuries.currentTime.toLocaleString()}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 pb-0">
          {/* <pre>{JSON.stringify(treasuries, null, 2)}</pre> */}
          <ChartContainer
            config={chartConfig}
            className="mx-auto aspect-square max-h-[300px]"
          >
            <PieChart>
              <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
              <Pie
                data={coloredData}
                dataKey="value"
                nameKey="label"
                innerRadius={60}
                outerRadius={110}
                strokeWidth={2}
                labelLine={true}
                label={false}
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
                            ${treasuries.totalUSD.toFixed(0)}
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
              <ChartLegend
                content={<ChartLegendContent />}
                // className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
              />
            </PieChart>
          </ChartContainer>
        </CardContent>
        <CardFooter className="flex-col gap-2 mt-2 text-sm text-center">
          <p className="text-xs leading-none text-muted-foreground">
            The total treasury amount might deviate from the actual amount due
            to the use of different prices for each asset. For more accurate
            values, please refer to the detailed breakdown in block explorers:{" "}
            {[
              treasuries.treasuryAH.url,
              treasuries.treasuryPolkadot.url,
              treasuries.multisigPolkadot.url,
              treasuries.hydra.url,
              treasuries.eth.mainnet.url,
              treasuries.eth.base.url,
            ].map((url: string, index: number) => (
              <a
                key={index}
                href={url}
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
    </>
  )
}
