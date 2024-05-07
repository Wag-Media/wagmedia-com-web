"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PaymentFull,
  PaymentWithUser,
  PostWithUserAndCategories,
} from "@/data/types"
import { Category, Payment, Post, Reaction, User } from "@prisma/client"
import {
  CaretSortIcon,
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
import { set } from "date-fns"
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

import { DatePickerWithRange } from "../date-picker/date-picker-with-range"
import { fuzzyFilter } from "./table-util"

export const columns: ColumnDef<PaymentFull>[] = [
  {
    id: "postId",
    accessorFn: (payment) => payment.postId,
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
    accessorFn: (payment) => payment.Post?.user.name,
    header: "Recipient",
    cell: ({ row, getValue }) => {
      const user: User | undefined = row.original.Post?.user

      return (
        <div className="flex flex-col items-center gap-2 text-center">
          {user && user.avatar && (
            <Image
              className="h-8 w-8 rounded-full"
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
    accessorFn: (payment) => {
      return payment.user?.name
    },
    cell: ({ row, getValue }) => {
      const user: User | null = row.original.user

      return (
        <div className="flex flex-col items-center gap-2">
          {user?.avatar && (
            <Image
              className="h-8 w-8 rounded-full"
              src={user?.avatar}
              width={30}
              height={30}
              alt={`${user.name}'s avatar`}
            />
          )}
          <span>{user?.name}</span>
        </div>
      )
    },
  },
  {
    id: "featured",
    header: "Featured",
    accessorFn: (row) => {
      return row.Post?.isFeatured ? "featured ⭐️" : ""
    },
    cell: ({ row }) => {
      const post = row.original.Post

      return (
        <div className="flex flex-row items-center gap-2">
          {post?.isFeatured ? "⭐️" : "-"}
        </div>
      )
    },
  },
  {
    id: "title",
    accessorFn: (row) => {
      return row.Post?.title
    },
    cell: ({ getValue, row, renderValue }) => {
      const title = getValue<string>()

      return <div className="flex flex-row items-center gap-2">{title}</div>
    },
    aggregationFn: (leafRows, childRows) => {
      const title = childRows[0].original.Post?.title
      return title
    },
    header: "Title",
  },
  {
    header: "Categories",
    accessorFn: (row) => {
      return row.Post?.categories?.map((category) => category.name).join(", ")
    },
    aggregationFn: (leafRows, childRows) => {
      const categories = childRows[0].original.Post?.categories
      return categories?.map((category) => category.name).join(", ")
    },
    cell: (props) => {
      const categories = props.getValue() as string

      return (
        <div className="flex flex-row items-center gap-2">{categories}</div>
      )
    },
  },
  // {
  //   accessorKey: "status",
  //   header: "Status",
  //   cell: ({ row }) => (
  //     <div className="capitalize">{row.getValue("status")}</div>
  //   ),
  // },
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      )
    },
    aggregationFn: (leafRows, childRows) => {
      return childRows[0].original.unit
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "Post",
    header: "Link",
    cell: ({ row }) => {
      const post = row.original.Post

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {post?.discordLink ? (
            <Link
              href={post?.discordLink}
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              discord
            </Link>
          ) : (
            "?"
          )}
        </div>
      )
    },
  },
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

export function AuditTablePostsDisplay({
  postPayments,
}: {
  postPayments: PaymentFull[]
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
    featured: false,
    title: true,
    categories: true,
    status: true,
    unit: true,
    amount: true,
    link: true,
    actions: true,
  })
  const [rowSelection, setRowSelection] = useState({})

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(50)

  // filters
  const [filteredPayments, setFilteredPayments] = useState(postPayments)
  const [globalFilter, setGlobalFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt >= start && createdAt <= end
      })
      setFilteredPayments(filtered)
    } else if (startDate) {
      const start = new Date(startDate)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt >= start
      })
      setFilteredPayments(filtered)
    } else if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt <= end
      })
      setFilteredPayments(filtered)
    } else {
      setFilteredPayments(postPayments)
    }
  }, [startDate, endDate, postPayments])

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

  const uniquePostIds = new Set(postPayments.map((payment) => payment.postId))

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4 flex-wrap">
        <Input
          placeholder={`Filter all ${uniquePostIds.size} entries`}
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
                        <>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " ↑",
                            desc: " ↓",
                          }[header.column.getIsSorted() as string] ?? null}
                        </>
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
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Showing{" "}
          {Math.min(
            table.getFilteredRowModel().rows.length,
            uniquePostIds.size
          )}{" "}
          row(s).
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
