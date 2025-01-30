"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { Filter } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface EventsCategoryFilterProps {
  uniqueCategories: string[]
}

export function EventsCategoryFilter({
  uniqueCategories,
}: EventsCategoryFilterProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function handleCategorySelect(category: string) {
    const params = new URLSearchParams(searchParams)
    params.set("category", category)
    router.push(`?${params.toString()}`)
  }

  function handleClearFilter() {
    const params = new URLSearchParams(searchParams)
    params.delete("category")
    router.push(`?${params.toString()}`)
  }

  const currentCategory = searchParams.get("category")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="h-6 py-0 pl-1 pr-1 text-lg font-semibold text-purple-500 hover:bg-transparent hover:text-purple-600 focus-visible:bg-purple-100/50 focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:ring-offset-0"
        >
          {currentCategory
            ? `categorized ${currentCategory}`
            : "in all categories"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {currentCategory && (
          <DropdownMenuItem onClick={handleClearFilter}>
            Clear filter
          </DropdownMenuItem>
        )}
        {uniqueCategories.map((category) => (
          <DropdownMenuItem
            key={category}
            onClick={() => handleCategorySelect(category)}
            className={cn("cursor-pointer", {
              "text-purple-500": currentCategory === category,
            })}
          >
            {category}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
