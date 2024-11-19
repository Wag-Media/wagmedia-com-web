import { useEffect, useState } from "react"
import { getOddjobPaymentsGroupedByPostId } from "@/actions/getOddjobPayments"
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

import {
  exportOddjobPaymentsToCsv,
  exportPaymentsToCsv,
  exportToCsv,
} from "./table-util"

export function ExportButtonOddjobs({
  table,
  fundingSource,
  startDate,
  endDate,
  globalFilter,
}: {
  table: Table<any>
  fundingSource: string
  startDate: string
  endDate: string
  globalFilter: string
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
            const groupedPayments = await getOddjobPaymentsGroupedByPostId({
              fundingSource,
              page: "0",
              pageSize: "10000",
            })
            console.log("groupedPayments", groupedPayments)
            exportOddjobPaymentsToCsv(groupedPayments.data)
          }}
        >
          Export All Data
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize"
          onClick={async () => {
            const data = await getOddjobPaymentsGroupedByPostId({
              fundingSource,
              startDate,
              endDate,
              globalFilter,
              page: "0",
              pageSize: "10000",
            })
            const selectedColumns = table
              .getVisibleLeafColumns()
              .map((c) => c.id)
            exportOddjobPaymentsToCsv(data.data, selectedColumns)
          }}
        >
          Export Selected Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
