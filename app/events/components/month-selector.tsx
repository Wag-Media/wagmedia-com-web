"use client"

import { useRouter } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface MonthSelectorProps {
  selectedMonthAsDate: Date
}

export function MonthSelector({ selectedMonthAsDate }: MonthSelectorProps) {
  const router = useRouter()

  function handleMonthChange(newMonth: string) {
    router.push(`/events/${newMonth}`)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 px-1 py-0 ml-1 text-lg font-semibold text-pink-500 hover:bg-transparent hover:text-pink-600 focus-visible:bg-pink-100/50 focus-visible:ring-1 focus-visible:ring-pink-500 focus-visible:ring-offset-0"
        >
          {selectedMonthAsDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {Array.from({ length: 13 }, (_, index) => {
          const date = new Date()
          const currentMonth = date.getMonth()
          const currentYear = date.getFullYear()

          const monthDate = new Date(currentYear, currentMonth + index, 1)
          const monthStr = String(monthDate.getMonth() + 1).padStart(2, "0")
          const yearStr = monthDate.getFullYear().toString()
          const monthParam = `${monthStr}-${yearStr}`

          const monthYear = monthDate.toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })

          return (
            <DropdownMenuItem
              key={monthYear}
              onClick={() => handleMonthChange(monthParam)}
              className={cn("cursor-pointer", {
                "text-pink-500":
                  selectedMonthAsDate.getMonth() === monthDate.getMonth() &&
                  selectedMonthAsDate.getFullYear() === monthDate.getFullYear(),
              })}
            >
              {monthYear}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
