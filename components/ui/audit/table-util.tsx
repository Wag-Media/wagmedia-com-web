import { PaymentFull, PaymentOddjob } from "@/data/types"
import { rankItem } from "@tanstack/match-sorter-utils"
import { FilterFn, Row, Table } from "@tanstack/react-table"
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

function getCsvConfig(
  table: Table<PaymentFull | PaymentOddjob>,
  rows: Row<PaymentFull | PaymentOddjob>[]
) {
  const columnHeaders = table.getVisibleLeafColumns().map((column, index) => {
    return {
      key: index.toString(),
      displayLabel: column.id.charAt(0).toUpperCase() + column.id.slice(1),
    }
  })

  return mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    columnHeaders,
  })
}

export const exportAllToCsv = async (rows: any[]) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  })

  const rowData = rows.map((row) => row.map((cell: any) => cell.toString()))
  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}

export const exportOddjobPaymentsToCsv = async (
  payments: PaymentOddjob[],
  selectedColumns: string[] = []
) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  })

  const rowData = payments.map((payment) => {
    let fullData: Record<string, any> = {}

    if (selectedColumns.includes("postId") || selectedColumns.length === 0) {
      fullData.PostId = payment.oddJobId
    }
    if (selectedColumns.includes("createdAt") || selectedColumns.length === 0) {
      const dateData =
        payment.OddJob?.firstPaymentAt || payment.OddJob?.createdAt

      if (dateData) {
        fullData.CreatedAt = new Date(dateData).toUTCString()
      } else {
        fullData.CreatedAt = ""
      }
    }
    if (selectedColumns.includes("recipient") || selectedColumns.length === 0) {
      fullData.Recipient = payment.OddJob?.User.name
    }
    if (selectedColumns.includes("director") || selectedColumns.length === 0) {
      fullData.Director = payment.reaction?.user.name
    }
    if (
      selectedColumns.includes("description") ||
      selectedColumns.length === 0
    ) {
      fullData.Description = payment.OddJob?.description
    }
    if (selectedColumns.includes("role") || selectedColumns.length === 0) {
      fullData.Role = payment.OddJob?.role
    }
    if (selectedColumns.includes("timeline") || selectedColumns.length === 0) {
      fullData.Timeline = payment.OddJob?.timeline
    }
    if (
      selectedColumns.includes("agreedPayment") ||
      selectedColumns.length === 0
    ) {
      fullData.AgreedPayment = `${payment.OddJob?.requestedAmount} ${payment.OddJob?.requestedUnit}`
    }
    if (selectedColumns.includes("amount") || selectedColumns.length === 0) {
      fullData.PaidAmount = payment.amount.toFixed(2)
    }
    if (selectedColumns.includes("unit") || selectedColumns.length === 0) {
      fullData.PaidUnit = payment.unit
    }
    if (selectedColumns.includes("invoices") || selectedColumns.length === 0) {
      fullData.Invoices = payment.OddJob?.attachments
        .map((a) => a.name)
        .join(", ")
    }
    if (
      selectedColumns.includes("fundingSource") ||
      selectedColumns.length === 0
    ) {
      fullData.FundingSource = payment.fundingSource
    }

    return fullData
  })

  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}

export const exportPaymentsToCsv = async (
  payments: PaymentFull[],
  selectedColumns: string[] = []
) => {
  const rowData = payments.map((payment) => {
    const post = payment.Post

    let fullData: Record<string, any> = {}

    if (selectedColumns.includes("postId") || selectedColumns.length === 0) {
      fullData.PostId = payment.postId
    }
    if (selectedColumns.includes("createdAt") || selectedColumns.length === 0) {
      const dateData = payment.Post?.firstPaymentAt || payment.Post?.createdAt

      if (dateData) {
        fullData.CreatedAt = new Date(dateData).toUTCString()
      } else {
        fullData.CreatedAt = ""
      }
    }
    if (selectedColumns.includes("recipient") || selectedColumns.length === 0) {
      fullData.Recipient = payment.Post?.user?.name
    }
    if (selectedColumns.includes("director") || selectedColumns.length === 0) {
      fullData.Director = payment.reaction?.user.name
    }
    if (selectedColumns.includes("featured") || selectedColumns.length === 0) {
      fullData.Featured = post?.isFeatured ? true : false
    }
    if (selectedColumns.includes("title") || selectedColumns.length === 0) {
      fullData.Title = post?.title
    }
    if (
      selectedColumns.includes("Categories") ||
      selectedColumns.length === 0
    ) {
      fullData.Categories = post?.categories.map((c) => c.name).join(", ")
    }
    if (selectedColumns.includes("amount") || selectedColumns.length === 0) {
      fullData.Amount = payment.amount.toFixed(2)
    }
    if (selectedColumns.includes("unit") || selectedColumns.length === 0) {
      fullData.Unit = payment.unit
    }
    if (selectedColumns.includes("Post") || selectedColumns.length === 0) {
      fullData.Link = post?.discordLink
    }
    if (
      selectedColumns.includes("fundingSource") ||
      selectedColumns.length === 0
    ) {
      fullData.FundingSource = payment.fundingSource
    }

    return fullData
  })

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  })

  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}

// export function
export const exportToCsv = (
  table: Table<PaymentFull | PaymentOddjob>,
  rows: Row<PaymentFull | PaymentOddjob>[]
) => {
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
          return new Date(cell.row.original.createdAt).toUTCString()
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
        case "featured":
          return originalPost?.isFeatured ? "featured ⭐️" : ""
        default:
          if (typeof cell.getValue() === "object") {
            return JSON.stringify(cell.getValue())
          }
          return cell.getValue()
      }
    })
  )

  const csvConfig = getCsvConfig(table, rows)
  const csv = generateCsv(csvConfig)(rowData as any)
  download(csvConfig)(csv)
}
