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

export const exportOddjobPaymentsToCsv = async (payments: PaymentOddjob[]) => {
  const csvConfig = mkConfig({
    fieldSeparator: ",",
    filename: "wagmedia-audit", // export file name (without .csv)
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  })

  const rowData = payments.map((payment) => {
    return {
      postId: payment.oddJobId,
      createdAt: new Date(payment.createdAt).toUTCString(),
      recipient: payment.OddJob?.User.name,
      director: payment.reaction?.user.name,
      description: payment.OddJob?.description,
      role: payment.OddJob?.role,
      timeline: payment.OddJob?.timeline,
      agreedPayment: `${payment.OddJob?.requestedAmount} ${payment.OddJob?.requestedUnit}`,
      paidAmount: payment.amount.toFixed(2), // Summed amount
      paidUnit: payment.unit,
      invoices: payment.OddJob?.attachments.map((a) => a.name).join(", "),
      fundingSource: payment.fundingSource,
    }
  })

  const csv = generateCsv(csvConfig)(rowData)
  download(csvConfig)(csv)
}

export const exportPaymentsToCsv = async (payments: PaymentFull[]) => {
  // Group payments by postId
  const groupedPayments = payments.reduce((acc, payment) => {
    const postId = payment.Post?.id
    if (!postId) return acc

    if (!acc[postId]) {
      acc[postId] = { ...payment, amount: 0 }
    }

    acc[postId].amount += payment.amount
    return acc
  }, {} as Record<string, PaymentFull>)

  const rowData = Object.values(groupedPayments).map((payment) => {
    const post = payment.Post

    return {
      postId: post?.id,
      createdAt: payment.createdAt.toUTCString(),
      recipient: payment.Post?.user?.name,
      director: payment.reaction?.user.name,
      featured: post?.isFeatured ? true : false,
      title: post?.title,
      categories: post?.categories.map((c) => c.name).join(", "),
      amount: payment.amount.toFixed(2), // Summed amount
      unit: payment.unit,
      link: post?.discordLink,
      fundingSource: payment.fundingSource,
    }
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
