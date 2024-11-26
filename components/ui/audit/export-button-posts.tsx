import { useEffect, useState } from "react"
import { getPostPaymentsGroupedByPostId } from "@/actions/getPostPayments"
import { PaginationState, Row, Table } from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { exportPaymentsToCsv, exportToCsv } from "./table-util"

export function ExportButtonPosts({
  table,
  fundingSource,
  startDate,
  endDate,
  globalFilter,
  directorFilter,
}: {
  table: Table<any>
  fundingSource: string
  startDate: string
  endDate: string
  globalFilter: string
  directorFilter: string
}) {
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
          onClick={async () => {
            const groupedPayments = await getPostPaymentsGroupedByPostId({
              fundingSource,
              page: "0",
              pageSize: "10000",
              sorting: table.getState().sorting,
            })
            exportPaymentsToCsv(groupedPayments.data)
            console.info(`Exported ${groupedPayments.data.length} posts to CSV`)
          }}
        >
          Export All Data
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize"
          onClick={async () => {
            const data = await getPostPaymentsGroupedByPostId({
              fundingSource,
              startDate,
              endDate,
              globalFilter,
              directorFilter,
              page: "0",
              pageSize: "10000",
              sorting: table.getState().sorting,
            })
            const selectedColumns = table
              .getVisibleLeafColumns()
              .map((c) => c.id)

            exportPaymentsToCsv(data.data, selectedColumns)
            console.info(`Exported ${data.data.length} posts to CSV`)
          }}
        >
          Export Selected Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
