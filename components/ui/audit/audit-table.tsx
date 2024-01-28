"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Category, Payment, Post, Reaction, User } from "@prisma/client"
import {
  CaretSortIcon,
  ChevronDownIcon,
  DotsHorizontalIcon,
} from "@radix-ui/react-icons"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { set } from "date-fns"
import { DateRange } from "react-day-picker"

import {
  PaymentFull,
  PostWithTagsCategoriesReactionsPaymentsUser,
  ReactionWithUser,
} from "@/types/prisma"
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
    accessorKey: "createdAt",
    header: "Datetime",
    cell: ({ row }) => {
      const payment: Payment = row.original
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {payment.createdAt.toUTCString()}
        </div>
      )
    },
  },
  {
    id: "recipient",
    accessorFn: (payment) => payment.Post.user.name,
    header: "Recipient",

    cell: ({ row }) => {
      const post: Post & { user: User } = row.getValue("Post")
      const user: User = post?.user

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {user.avatar && (
            <Image
              className="h-8 rounded-full"
              src={user.avatar}
              width={30}
              height={30}
              alt={`${user.name}'s avatar`}
            />
          )}
          <span>{user.name}</span>
        </div>
      )
    },
  },
  {
    id: "director",
    accessorFn: (payment) => payment.reaction.user.name,
    header: "Director",
    cell: ({ row, getValue }) => {
      const user: User = row.original.reaction.user

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {user?.avatar && (
            <Image
              className="rounded-full"
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
    accessorFn: (payment) => payment.Post.isFeatured,
    header: "Featured",
    cell: ({ row }) => {
      const post: Post & { user: User } = row.getValue("Post")

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {post.isFeatured ? "⭐️" : "-"}
        </div>
      )
    },
  },
  {
    id: "title",
    accessorFn: (payment) => payment.Post.title,
    header: "Title",
  },
  {
    accessorKey: "Post",
    header: "Categories",
    cell: ({ row }) => {
      const post: Post & { categories: Category[] } = row.getValue("Post")

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {post.categories.map((category: Category) => (
            <span key={category.id} className="capitalize">
              {category.name}
            </span>
          ))}
        </div>
      )
    },
  },
  //   {
  //     accessorKey: "status",
  //     header: "Status",
  //     cell: ({ row }) => (
  //       <div className="capitalize">{row.getValue("status")}</div>
  //     ),
  //   },
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
    cell: ({ row }) => <div className="uppercase">{row.getValue("unit")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: row.getValue("unit"),
      }).format(amount)

      return <div className="text-right font-medium">{formatted}</div>
    },
  },
  {
    accessorKey: "Post",
    header: "Link",
    cell: ({ row }) => {
      const post: Post & { user: User } = row.getValue("Post")
      const user: User = post?.user

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {post.link ? (
            <Link
              href={post.link}
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
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <DotsHorizontalIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() =>
                navigator.clipboard.writeText(payment.id.toString())
              }
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    },
  },
]

export function AuditTable({ payments }: { payments: Payment[] }) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const [pageIndex, setPageIndex] = useState(0)
  const [pageSize, setPageSize] = useState(50)

  // filters
  const [filteredPayments, setFilteredPayments] = useState(payments)
  const [globalFilter, setGlobalFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = payments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt >= start && createdAt <= end
      })
      setFilteredPayments(filtered)
    } else if (startDate) {
      const start = new Date(startDate)
      const filtered = payments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt >= start
      })
      setFilteredPayments(filtered)
    } else if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = payments.filter((payment) => {
        const createdAt = new Date(payment.createdAt)
        return createdAt <= end
      })
      setFilteredPayments(filtered)
    } else {
      setFilteredPayments(payments)
    }
  }, [startDate, endDate, payments])

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
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      globalFilter,
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageSize,
        pageIndex,
      },
    },
  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter all entries"
          value={globalFilter}
          onChange={(event) => {
            console.log(event.target.value)
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
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
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
