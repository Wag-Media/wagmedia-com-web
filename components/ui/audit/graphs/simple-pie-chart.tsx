"use client"

import * as React from "react"
import { Description } from "@headlessui/react/dist/components/description/description"
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

export function SimplePieChart({
  title,
  description,
  footer,
  // chartConfig,
  centerText,
  data,
  centerTextDescription,
}: {
  title: React.ReactNode
  description?: React.ReactNode
  footer?: React.ReactNode
  // chartConfig: ChartConfig
  data: {
    name: string
    value: number
  }[]
  centerText?: string
  centerTextDescription?: string
}) {
  const chartConfig = Object.entries(data).reduce((acc: any, [key, value]) => {
    acc[value.name] = {
      label: value.name,
    }
    return acc
  }, {}) satisfies ChartConfig

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
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
                    `${
                      chartConfig[name as keyof typeof chartConfig].label
                    }: ${value.toLocaleString()} DOT`
                  }
                />
              }
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={80}
              outerRadius={130}
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
                          {centerText}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          {centerTextDescription}
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
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">{footer}</CardFooter>
    </Card>
  )
}
