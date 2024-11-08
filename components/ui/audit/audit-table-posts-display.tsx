"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { getPostPayments } from "@/actions/getPostPayments"
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
import { keepPreviousData, useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  ColumnFiltersState,
  GroupingState,
  PaginationState,
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
import { ChevronLeftIcon, ChevronRightIcon, Loader2 } from "lucide-react"
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
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { DatePickerWithRange } from "../date-picker/date-picker-with-range"
import { ExportButton } from "./export-button"
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
              className="w-8 h-8 rounded-full"
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
              className="w-8 h-8 rounded-full"
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
    header: () => <div className="w-full text-right">Paid Amount</div>,
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
  {
    id: "fundingSource",
    accessorFn: (payment) => payment.fundingSource,
    header: "Funding Source",
    aggregationFn: (leafRows, childRows) => {
      const fundingSource = childRows[0].original.fundingSource
      return fundingSource
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
  //           <Button variant="ghost" className="w-8 h-8 p-0">
  //             <span className="sr-only">Open menu</span>
  //             <DotsHorizontalIcon className="w-4 h-4" />
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
  hasNextPage,
  hasPrevPage,
  totalCount,
}: {
  postPayments: PaymentFull[]
  hasNextPage: boolean
  hasPrevPage: boolean
  totalCount: number
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
    fundingSource: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  // filters
  const [filteredPayments, setFilteredPayments] = useState(postPayments)
  const [globalFilter, setGlobalFilter] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [fundingSource, setFundingSource] = useState<string>("OpenGov-1130")

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string[], value: string[]) => {
      const params = new URLSearchParams(searchParams.toString())
      name.forEach((n, i) => {
        params.set(n, value[i])
      })

      return pathname + "?" + params.toString()
    },
    [searchParams]
  )

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate)
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt >= start && createdAt <= end
      })
      // setFilteredPayments(filtered)
      router.push(
        createQueryString(["startDate", "endDate"], [startDate, endDate])
      )
    } else if (startDate) {
      const start = new Date(startDate)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt >= start
      })
      // setFilteredPayments(filtered)
      router.push(createQueryString(["startDate"], [startDate]))
    } else if (endDate) {
      const end = new Date(endDate)
      end.setHours(23, 59, 59, 999)
      const filtered = postPayments.filter((row) => {
        const createdAt = new Date(row.createdAt)
        return createdAt <= end
      })
      // setFilteredPayments(filtered)
      router.push(createQueryString(["endDate"], [endDate]))
    } else {
      // setFilteredPayments(postPayments)
    }
  }, [startDate, endDate, postPayments])

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const dataQuery = useQuery({
    queryKey: ["data", pagination],
    queryFn: () =>
      getPostPayments({
        page: pagination.pageIndex.toString(),
        pageSize: pagination.pageSize.toString(),
        where: {
          postId: {
            not: null,
          },
        },
      }),
    placeholderData: keepPreviousData, // don't have 0 rows flash while changing pages/loading next page
  })

  const defaultData = useMemo(() => [], [])

  const table = useReactTable({
    data: dataQuery.data ?? defaultData,
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
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: totalCount,
  })

  useEffect(() => {
    const filtered = postPayments.filter((payment) => {
      return payment.fundingSource === fundingSource
    })
    setFilteredPayments(filtered)
  }, [fundingSource, postPayments])

  const uniquePostIds = new Set(
    filteredPayments.map((payment) => payment.postId)
  )

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-4 py-4">
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
        <Select
          value={fundingSource}
          onValueChange={setFundingSource}
          defaultValue="OpenGov-1130"
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Funding Source" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="OpenGov-1130">OpenGov-1130</SelectItem>
            <SelectItem value="OpenGov-365">OpenGov-365</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex flex-row gap-2 ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="" size="sm">
                Columns <ChevronDownIcon className="w-4 h-4 ml-2" />
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
          <ExportButton
            rows={table.getRowModel().rows}
            pagination={pagination}
            setPagination={setPagination}
            isLoading={dataQuery.isFetching}
          />
        </div>
      </div>
      <div className="border rounded-md">
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
      <div className="flex items-center justify-end py-4 space-x-2">
        <div className="flex-1 text-sm text-muted-foreground">
          Showing {table.getFilteredRowModel().rows.length} of {totalCount}{" "}
          row(s).
        </div>
        <div className="flex flex-row items-center space-x-2">
          <div className="flex flex-row items-center text-sm text-muted-foreground">
            <div className="mr-1 whitespace-nowrap">per page</div>
            <Select
              value={pagination.pageSize.toString()}
              onValueChange={(value) => {
                setPagination({
                  ...pagination,
                  pageSize: parseInt(value),
                })
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Page Size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
                <SelectItem value="100">100</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {dataQuery.isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : null}
          {table.getCanPreviousPage() ? (
            // <Link href={previousPage()}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.previousPage()
              }}
              disabled={dataQuery.isLoading}
            >
              <ChevronLeftIcon className="w-3 h-3" />
            </Button>
          ) : (
            // </Link>
            <Button variant="outline" size="sm" disabled>
              <ChevronLeftIcon className="w-3 h-3" />
            </Button>
          )}
          <div className="flex flex-1 text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </div>
          {table.getCanNextPage() ? (
            // <Link href={nextPage()}>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                table.nextPage()
              }}
              disabled={dataQuery.isLoading}
            >
              <ChevronRightIcon className="w-3 h-3" />
            </Button>
          ) : (
            // </Link>
            <Button variant="outline" size="sm" disabled>
              <ChevronRightIcon className="w-3 h-3" />
            </Button>
          )}
        </div>
      </div>
      {/* <pre className="text-xs">{JSON.stringify(payments, null, 2)}</pre> */}
    </div>
  )
}
