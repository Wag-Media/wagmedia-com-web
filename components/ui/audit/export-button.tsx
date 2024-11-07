import { useEffect, useState } from "react"
import { PaginationState, Row } from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { exportAllToCsv, exportToCsv } from "./table-util"

export function ExportButton({
  rows,
  pagination,
  setPagination,
  isLoading,
}: {
  rows: Row<any>[]
  pagination: PaginationState
  setPagination: (pagination: PaginationState) => void
  isLoading: boolean
}) {
  const [isExportAllLoading, setIsExportAllLoading] = useState(false)
  const [oldPagination, setOldPagination] = useState(pagination)

  useEffect(() => {
    if (isExportAllLoading) {
      if (!isLoading) {
        exportToCsv(rows)
        setIsExportAllLoading(false)
        console.log("setting pagination to", oldPagination)
        setPagination(oldPagination)
      }
    }
  }, [
    isLoading,
    isExportAllLoading,
    pagination,
    rows,
    oldPagination,
    setPagination,
  ])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="" size="sm">
          Export <DownloadIcon className="w-4 h-4 ml-2" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="capitalize"
          onClick={() => {
            setOldPagination(pagination)
            setPagination({
              pageIndex: 0,
              pageSize: 10000,
            })
            setIsExportAllLoading(true)
          }}
        >
          Export All Data
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize"
          onClick={() => exportToCsv(rows)}
        >
          Export Selected Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
