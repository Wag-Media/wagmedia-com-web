import { useEffect, useState } from "react"
import {
  getPostPayments,
  getPostPaymentsFiltered,
  getPostPaymentsGroupedByPostId,
} from "@/actions/getPostPayments"
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
            const groupedPayments = await getPostPaymentsGroupedByPostId({
              fundingSource,
              page: "0",
              pageSize: "10000",
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
            // const data = await getPostPaymentsFiltered({
            //   fundingSource,
            //   startDate: startDate ? new Date(startDate) : undefined,
            //   endDate: endDate ? new Date(endDate) : undefined,
            //   globalFilter,
            //   page: "0",
            //   pageSize: "10000",
            // })
            const data = await getPostPaymentsGroupedByPostId({
              fundingSource,
              startDate,
              endDate,
              globalFilter,
              page: "0",
              pageSize: "10000",
            })
            exportPaymentsToCsv(data.data)
            console.info(`Exported ${data.data.length} posts to CSV`)
          }}
        >
          Export Selected Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
