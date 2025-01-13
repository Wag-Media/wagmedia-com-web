"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, X } from "lucide-react"

import { Input } from "@/components/ui/input"

export function SearchInput({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="relative">
      <Search className="absolute w-4 h-4 -translate-y-1/2 left-3 top-1/2 text-muted-foreground dark:text-foreground" />
      <Input
        placeholder="Search..."
        className="h-12 pl-10 pr-10 border-0 border-b rounded-none rounded-t-md focus:ring-0 focus:border-none focus-visible:ring-offset-1"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoFocus
      />
    </div>
  )
}
