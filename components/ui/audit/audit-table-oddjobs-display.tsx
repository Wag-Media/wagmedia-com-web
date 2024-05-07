"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { OddJobWithUserAndCategories, PaymentOddjob } from "@/data/types"
import { DiscordIcon } from "@/images/icons"
import {
  Attachment,
  Category,
  OddJob,
  Payment,
  Post,
  Reaction,
  User,
} from "@prisma/client"
import {
  CaretDownIcon,
  CaretLeftIcon,
  CaretSortIcon,
  CaretUpIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  GroupingState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { dynamic } from "../../../app/audit/[[...tab]]/page"
import { DatePickerWithRange } from "../date-picker/date-picker-with-range"
import AttachmentLink from "./attachment-link"
import FileViewer from "./file-viewer"
import { fuzzyFilter } from "./table-util"

export const columns: ColumnDef<PaymentOddjob>[] = [
  {
    id: "postId",
    accessorFn: (payment) => payment.oddJobId,
  },
  {
    id: "createdAt",
    accessorFn: (row) => {
      return row.createdAt
    },
    header: "Datetime",
    cell: (props) => {
      const datetime = props.getValue() as Date
      return (
        <div className="flex flex-row items-center gap-2">
          {datetime.toUTCString()}
        </div>
      )
    },
    aggregationFn: (leafRows, childRows) => {
      return childRows[0].original.createdAt
    },
  },
  {
    id: "recipient",
    accessorFn: (payment) => payment.OddJob.User.name,
    header: "Recipient",
    cell: ({ row, getValue }) => {
      const user: User = row.original.OddJob.User

      return (
        <div className="flex flex-col items-center gap-2">
          {user && user.avatar && (
            <Image
              className="h-8 rounded-full"
              src={user.avatar}
              width={30}
              height={30}
              alt={`${user.name}'s avatar`}
            />
          )}
          {user && <span>{user.name}</span>}
        </div>
      )
    },
  },
  {
    id: "director",
    header: "Director",
    accessorFn: (payment) => payment.OddJob.manager.name,
    cell: ({ row, getValue }) => {
      const user: User = row.original.OddJob.manager

      return (
        <div className="flex flex-col items-center gap-2">
          {user && user.avatar && (
            <Image
              className="h-8 rounded-full"
              src={user.avatar}
              width={30}
              height={30}
              alt={`${user.name}'s avatar`}
            />
          )}
          {user && <span>{user.name}</span>}
        </div>
      )
    },
  },
  {
    id: "description",
    header: "Description",
    accessorFn: (row) => {
      return row.OddJob.description
    },

    cell: ({ getValue, row, renderValue }) => {
      const description = getValue<string>()

      return (
        <div className="flex flex-row items-center gap-2">{description}</div>
      )
    },
    aggregationFn: (leafRows, childRows) => {
      const description = childRows[0].original.OddJob.description
      return description
    },
  },
  {
    id: "role",
    accessorFn: (payment) => payment.OddJob.role,
    header: "Role",
    aggregationFn: (leafRows, childRows) => {
      const role = childRows[0].original.OddJob.role
      return role
    },
  },
  {
    id: "timeline",
    accessorFn: (payment) => payment.OddJob.timeline,
    header: "Timeline",
    aggregationFn: (leafRows, childRows) => {
      const timeline = childRows[0].original.OddJob.timeline
      return timeline
    },
  },
  {
    id: "agreedPayment",
    accessorFn: (payment) =>
      `${payment.OddJob.requestedAmount} ${payment.OddJob.requestedUnit}`,
    header: "Agreed Payment",
    cell: ({ row }) => {
      const payment: PaymentOddjob = row.original
      return (
        <div className="flex flex-row items-center gap-2">
          {payment.OddJob.requestedAmount} {payment.OddJob.requestedUnit}
        </div>
      )
    },
    aggregationFn: (leafRows, childRows) => {
      const payment = childRows[0].original
      return `${payment.OddJob.requestedAmount} ${payment.OddJob.requestedUnit}`
    },
  },
  //   {
  //     accessorKey: "Post",
  //     header: "Categories",
  //     cell: ({ row }) => {
  //       const post: Post & { categories: Category[] } = row.getValue("Post")

  //       return (
  //         <div className="flex flex-row items-center justify-center gap-2">
  //           {post.categories.map((category: Category) => (
  //             <span key={category.id} className="capitalize">
  //               {category.name}
  //             </span>
  //           ))}
  //         </div>
  //       )
  //     },
  //   },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("status")}</div>
  //     ),
  //   },
  {
    accessorKey: "amount",
    header: () => <div className="text-right w-full">Paid Amount</div>,
    cell: ({ row, getValue }) => {
      const amount = getValue<number>()
      return <div className="text-right">{amount.toFixed(2)}</div>
    },
    aggregationFn: (leafRows, childRows) => {
      const amount = childRows.reduce(
        (acc, row) => acc + row.original.amount,
        0
      )
      return amount
    },
  },
  {
    accessorKey: "unit",
    header: "Paid Unit",
    aggregationFn: (leafRows, childRows) => {
      const unit = childRows[0].original.unit
      return unit
    },
  },
  {
    id: "invoices",
    header: "Invoices",
    accessorFn: (payment) => payment.OddJob.attachments.map((a) => a.name),
    cell: ({ row, getValue }) => {
      const attachments = getValue<Attachment[]>()

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {attachments?.map((attachment, index) => (
            // <Link
            //   key={index}
            //   href={attachment.url}
            //   target="_blank"
            //   rel="noreferrer"
            //   className="underline"
            // >
            //   {`invoice ${index + 1}`}
            //   {JSON.stringify(attachment.url)}
            // </Link>
            // <AttachmentLink key={index} attachment={attachment} />
            <FileViewer
              key={index}
              mimeType={attachment.mimeType}
              byteArray={attachment.data as unknown as string}
            >
              <span className="underline">📄 {index + 1}</span>
            </FileViewer>
          ))}
        </div>
      )
    },
    aggregationFn: (leafRows, childRows) => {
      const attachments = childRows[0].original.OddJob.attachments
      return attachments
    },
  },
  {
    id: "link",
    header: "Link",
    accessorFn: (payment) => payment.OddJob.discordLink,
    aggregationFn: (leafRows, childRows) => {
      const discordLink = childRows[0].original.OddJob.discordLink
      return discordLink
    },
    cell: ({ row, getValue }) => {
      const discordLink = getValue<string>()
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {discordLink ? (
            <Link
              href={discordLink}
              target="_blank"
              rel="noreferrer"
              className="underline text-gray-500"
            >
              <DiscordIcon />
            </Link>
          ) : (
            "?"
          )}
        </div>
      )
    },
  },
  // {
  //   accessorKey: "OddJob",
  //   header: "Link",
  //   cell: ({ row }) => {
  //     const oddjob: OddJob & { user: User } = row.getValue("OddJob")
  //     const user: User = oddjob?.user

  //     return (
  //       <div className="flex flex-row items-center justify-center gap-2">
  //         {oddjob.discordLink ? (
  //           <Link
  //             href={oddjob.discordLink}
  //             target="_blank"
  //             rel="noreferrer"
  //             className="underline"
  //           >
  //             discord
  //           </Link>
  //         ) : (
  //           "?"
  //         )}
  //       </div>
  //     )
  //   },
  // },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     const payment = row.original

  //     return (
  //       <DropdownMenu>
  //         <DropdownMenuTrigger asChild>
  //           <Button variant="ghost" className="h-8 w-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="h-4 w-4" />
  //           </Button>
  //         </DropdownMenuTrigger>
  //         <DropdownMenuContent align="end">
  //           <DropdownMenuLabel>Actions</DropdownMenuLabel>
  //           <DropdownMenuItem
  //             onClick={() =>
  //               navigator.clipboard.writeText(payment.id.toString())
  //             }
  //           >
  //             Copy payment ID
  //           </DropdownMenuItem>
  //           <DropdownMenuSeparator />
  //           <DropdownMenuItem>View customer</DropdownMenuItem>
  //           <DropdownMenuItem>View payment details</DropdownMenuItem>
  //         </DropdownMenuContent>
  //       </DropdownMenu>
  //     )
  //   },
  // },
]

export function AuditTableOddjobsDisplay({
  oddjobPayments,
}: {
  oddjobPayments: Payment[]
}) {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true, // `false` for ascending, `true` for descending
    },
  ])
  const [grouping, setGrouping] = useState<GroupingState>(["postId"])

  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({
    postId: false,
    createdAt: true,
    recipient: true,
    director: true,
    description: true,
    role: true,
    timeline: true,
    agreedPayment: true,
    unit: true,
    amount: true,
  })
  const [rowSelection, setRowSelection] = useState({})

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(50)

  // filters
  const [filteredPayments, setFilteredPayments] = useState(oddjobPayments)
  const [globalFilter, setGlobalFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = oddjobPayments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt >= start && createdAt <= end
      })
      setFilteredPayments(filtered)
    } else if (startDate) {
      const start = new Date(startDate)
      const filtered = oddjobPayments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt >= start
      })
      setFilteredPayments(filtered)
    } else if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = oddjobPayments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt <= end
      })
      setFilteredPayments(filtered)
    } else {
      setFilteredPayments(oddjobPayments)
    }
  }, [startDate, endDate, oddjobPayments])

  const table = useReactTable({
    data: filteredPayments,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: fuzzyFilter,
    onGroupingChange: setGrouping,
    getGroupedRowModel: getGroupedRowModel(),
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      sorting,
      grouping,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  })

  const uniqueOddjobIds = new Set(
    oddjobPayments.map((payment) => payment.oddJobId)
  )

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <Input
          placeholder={`Filter all ${uniqueOddjobIds.size} entries`}
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value)
          }}
          className="w-64"
        />
        <DatePickerWithRange
          from={startDate}
          to={endDate}
          onChangeRange={(range: DateRange | undefined) => {
            if (range && range.from && range.to) {
              setStartDate(range.from.toISOString())
              setEndDate(range.to.toISOString())
            } else {
              setStartDate("")
              setEndDate("")
            }
          }}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDownIcon className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className={cn({
                        "cursor-pointer": header.column.getCanSort(),
                      })}
                      onClick={header.column.getToggleSortingHandler()}
                      title={
                        header.column.getCanSort()
                          ? header.column.getNextSortingOrder() === "asc"
                            ? "Sort ascending"
                            : header.column.getNextSortingOrder() === "desc"
                            ? "Sort descending"
                            : "Clear sort"
                          : undefined
                      }
                    >
                      {header.isPlaceholder ? null : (
                        <div className="flex flex-row">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: <CaretUpIcon className="ml-2 size-4" />,
                            desc: <CaretDownIcon className="ml-2 size-4" />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex - 1)}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex(pageIndex + 1)}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
      {/* <pre className="text-xs">{JSON.stringify(payments, null, 2)}</pre> */}
    </div>
  )
}
