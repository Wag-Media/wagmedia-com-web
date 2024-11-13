"use client"

import { table } from "console"
import { useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import {
  getPostPayments,
  getPostPaymentsFiltered,
  getPostPaymentsGroupedByPostId,
} from "@/actions/getPostPayments"
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
import { useDebounce } from "@uidotdev/usehooks"
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
import { Label } from "../label"
import { Skeleton } from "../skeleton"
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
      const datetime = new Date(props.getValue() as string)
      return (
        <div className="flex flex-row items-center gap-2 tabular-nums">
          {datetime.toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            timeZoneName: "shortGeneric",
          })}
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
        <div className="flex flex-row items-center gap-2 text-center">
          {user && user.avatar && (
            <Image
              className="w-6 h-6 rounded-full"
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
        <div className="flex flex-row items-center gap-2">
          {user?.avatar && (
            <Image
              className="w-6 h-6 rounded-full"
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
    header: () => (
      <div className="w-full text-right tabular-nums">Paid Amount</div>
    ),
    cell: ({ row, getValue }) => {
      const amount = getValue<number>()
      return <div className="text-right tabular-nums">{amount.toFixed(2)}</div>
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

export function AuditTablePostsDisplay() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true, // `false` for ascending, `true` for descending
    },
  ])

  // const [grouping, setGrouping] = useState<GroupingState>(["postId"])
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
  const [globalFilter, setGlobalFilter] = useState("")
  const debouncedGlobalFilter = useDebounce(globalFilter, 300)
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [fundingSource, setFundingSource] = useState<string>("OpenGov-1130")

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  const dataQuery = useQuery({
    queryKey: [
      "data",
      pagination,
      fundingSource,
      startDate,
      endDate,
      debouncedGlobalFilter,
    ],
    queryFn: async () => {
      const groupedPayments = await getPostPaymentsGroupedByPostId({
        fundingSource,
        startDate,
        endDate,
        globalFilter: debouncedGlobalFilter,
        page: pagination.pageIndex.toString(),
        pageSize: pagination.pageSize.toString(),
      })

      return groupedPayments
    },
  })

  const defaultData = useMemo(() => [], [])

  const tableData = useMemo(() => {
    return dataQuery.isLoading || dataQuery.isFetching
      ? (Array(pagination.pageSize)
          .fill({})
          .map((_, index) => ({ postId: index })) as any[])
      : dataQuery.data?.data ?? defaultData
  }, [dataQuery.isLoading, dataQuery.isFetching, pagination.pageSize])

  const columnData = useMemo(() => {
    return dataQuery.isLoading || dataQuery.isFetching
      ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-[20px]" />,
        }))
      : columns
  }, [dataQuery.isLoading, dataQuery.isFetching])

  const table = useReactTable({
    data: tableData,
    columns: columnData,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
    },
    onPaginationChange: setPagination,
    manualPagination: true,
    rowCount: dataQuery.data?.totalCount,
  })

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-end gap-4 py-4">
        <div className="flex flex-col gap-1">
          <Label className="text-sm">Search all posts</Label>
          <Input
            placeholder={`Filter ${dataQuery.data?.totalCount ?? ""} entries`}
            value={globalFilter}
            onChange={(event) => {
              setGlobalFilter(event.target.value)
            }}
            className="w-64"
          />
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm">Date Range</Label>
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
        </div>
        <div className="flex flex-col gap-1">
          <Label className="text-sm">Funding Source</Label>
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
        </div>

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
            table={table}
            fundingSource={fundingSource}
            startDate={startDate}
            globalFilter={globalFilter}
            endDate={endDate}
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
                    <TableCell key={cell.id} className="py-2">
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
          {/* {table.getFilteredSelectedRowModel().rows.length} of{" "} */}
          Showing {table.getFilteredRowModel().rows.length} of{" "}
          {dataQuery.data?.totalCount} row(s).
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
                <SelectItem value="100">250</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {dataQuery.isLoading ? (
            <Loader2 className="w-3 h-3 animate-spin" />
          ) : null}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.firstPage()
            }}
            disabled={!table.getCanPreviousPage() || dataQuery.isLoading}
          >
            <ChevronLeftIcon className="w-3 h-3 -mr-2" />
            <ChevronLeftIcon className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.previousPage()
            }}
            disabled={!table.getCanPreviousPage() || dataQuery.isLoading}
          >
            <ChevronLeftIcon className="w-3 h-3" />
          </Button>

          <div className="flex flex-1 text-sm text-muted-foreground">
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount().toLocaleString()}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.nextPage()
            }}
            disabled={!table.getCanNextPage() || dataQuery.isLoading}
          >
            <ChevronRightIcon className="w-3 h-3" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              table.lastPage()
            }}
            disabled={!table.getCanNextPage() || dataQuery.isLoading}
          >
            <ChevronRightIcon className="w-3 h-3 -mr-2" />
            <ChevronRightIcon className="w-3 h-3" />
          </Button>
        </div>
      </div>
      {/* <pre className="text-xs">{JSON.stringify(payments, null, 2)}</pre> */}
    </div>
  )
}
