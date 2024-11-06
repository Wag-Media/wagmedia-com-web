import { PaymentFull, PaymentOddjob } from "@/data/types"
import { rankItem } from "@tanstack/match-sorter-utils"
import { FilterFn, Row } from "@tanstack/react-table"
import { download, generateCsv, mkConfig } from "export-to-csv"

export const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

function getCsvConfig(rows: Row<PaymentFull | PaymentOddjob>[]) {
  const columnHeaders = rows[0].getVisibleCells().map((cell, index) => {
    // make first letter uppercase
    return {
      key: index.toString(),
      displayLabel:
        cell.column.id.charAt(0).toUpperCase() + cell.column.id.slice(1),
    }
  })

  return mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    columnHeaders,
  })
}

// export function
export const exportToCsv = (rows: Row<PaymentFull | PaymentOddjob>[]) => {
  // get the data for each row
  const rowData = rows.map((row) =>
    row.getVisibleCells().map((cell) => {
      const isOddjob = cell.row.original.oddJobId !== null

      const originalOddJob = isOddjob
        ? (cell.row.original as PaymentOddjob).OddJob
        : undefined
      const originalPost = isOddjob
        ? undefined
        : (cell.row.original as PaymentFull).Post

      switch (cell.column.id) {
        case "createdAt":
          return cell.row.original.createdAt.toUTCString()
        case "Post":
          return isOddjob
            ? originalOddJob?.discordLink
            : originalPost?.discordLink
        case "invoices":
          return isOddjob
            ? originalOddJob?.attachments.map((a) => a.url).join(", ")
            : undefined
        case "recipient":
          return isOddjob ? originalOddJob?.User.name : originalPost?.user.name
        case "director":
          return cell.row.original.reaction?.user.name
        default:
          if (typeof cell.getValue() === "object") {
            return JSON.stringify(cell.getValue())
          }
          return cell.getValue()
      }
    })
  )

  const csvConfig = getCsvConfig(rows)
  const csv = generateCsv(csvConfig)(rowData as any)
  download(csvConfig)(csv)
}
