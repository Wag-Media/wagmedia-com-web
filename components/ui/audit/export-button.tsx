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

export function ExportButton({
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
              where: {
                fundingSource,
                postId: {
                  not: null,
                },
              },
              page: "0",
              pageSize: "10000",
            })
            console.log(groupedPayments)
            const allData = await getPostPayments({
              where: {
                fundingSource,
              },
              page: "0",
              pageSize: "10000",
            })
            console.log(groupedPayments)
            exportPaymentsToCsv(allData.data)
          }}
        >
          Export All Data
        </DropdownMenuItem>
        <DropdownMenuItem
          className="capitalize"
          onClick={async () => {
            const data = await getPostPaymentsFiltered({
              fundingSource,
              startDate: startDate ? new Date(startDate) : undefined,
              endDate: endDate ? new Date(endDate) : undefined,
              globalFilter,
              page: "0",
              pageSize: "10000",
            })
            exportPaymentsToCsv(data.data)
          }}
        >
          Export Selected Data
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
