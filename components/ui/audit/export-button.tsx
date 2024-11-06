import { Row } from "@tanstack/react-table"
import { DownloadIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import { exportToCsv } from "./table-util"

export function ExportButton({
  rows,
  allRows,
}: {
  rows: Row<any>[]
  allRows: any[]
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
          onClick={() => exportToCsv(allRows)}
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
