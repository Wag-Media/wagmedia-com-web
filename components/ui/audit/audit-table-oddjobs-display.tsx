"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { getOddjobPaymentsGroupedByPostId } from "@/actions/getOddjobPayments"
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
import { useQuery } from "@tanstack/react-query"
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

import { dynamic } from "../../../app/audit/[[...tab]]/page"
import { DatePickerWithRange } from "../date-picker/date-picker-with-range"
import { Skeleton } from "../skeleton"
import AttachmentLink from "./attachment-link"
import { ExportButtonOddjobs } from "./export-button-oddjobs"
import FileViewer from "./file-viewer"

export const columns: ColumnDef<PaymentOddjob>[] = [
  {
    id: "postId",
    accessorFn: (payment) => payment.oddJobId,
    header: "Post ID",
  },
  // {
  //   id: "firstPaymentdAt",
  //   accessorFn: (row) => row.OddJob?.firstPaymentAt,
  //   header: "First Paymnet At",
  //   cell: (props) => {
  //     const datetime = new Date(props.getValue() as string)

  //     return (
  //       <div className="flex flex-row items-center gap-2">
  //         {datetime?.toUTCString()}
  //       </div>
  //     )
  //   },
  // },
  {
    id: "createdAt",
    accessorFn: (row) => row.OddJob?.firstPaymentAt || row.createdAt,
    header: "Datetime",
    cell: (props) => {
      const datetime = new Date(props.getValue() as string)

      return (
        <div className="flex flex-row items-center gap-2">
          {datetime?.toUTCString()}
        </div>
      )
    },
  },
  {
    id: "recipient",
    accessorFn: (payment) => payment.OddJob?.User.name,
    header: "Recipient",
    cell: ({ row, getValue }) => {
      const user: User = row.original.OddJob?.User

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
    accessorFn: (payment) => payment.OddJob?.manager?.name,
    cell: ({ row, getValue }) => {
      const user: User = row.original.OddJob?.manager

      return (
        <div className="flex flex-row items-center gap-2">
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
    id: "description",
    header: "Description",
    accessorFn: (row) => {
      return row.OddJob?.description
    },

    cell: ({ getValue, row, renderValue }) => {
      const description = getValue<string>()

      return (
        <div className="flex flex-row items-center gap-2">{description}</div>
      )
    },
  },
  {
    id: "role",
    accessorFn: (payment) => payment.OddJob?.role,
    header: "Role",
  },
  {
    id: "timeline",
    accessorFn: (payment) => payment.OddJob?.timeline,
    header: "Timeline",
  },
  {
    id: "agreedPayment",
    accessorFn: (payment) =>
      `${payment.OddJob?.requestedAmount} ${payment.OddJob?.requestedUnit}`,
    header: "Agreed Payment",
    cell: ({ row }) => {
      const payment: PaymentOddjob = row.original
      return (
        <div className="flex flex-row items-center gap-2">
          {payment.OddJob?.requestedAmount} {payment.OddJob?.requestedUnit}
        </div>
      )
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
    header: () => <div className="w-full text-right">Paid Amount</div>,
    cell: ({ row, getValue }) => {
      const amount = getValue<number>()
      return <div className="text-right">{amount.toFixed(2)}</div>
    },
  },
  {
    accessorKey: "unit",
    header: "Paid Unit",
  },
  {
    id: "invoices",
    header: "Invoices",
    accessorFn: (payment) => payment.OddJob?.attachments,
    cell: ({ row, getValue }) => {
      const attachments = getValue<Attachment[]>()

      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {attachments?.map((attachment, index) => (
            <span key={index}>
              {attachment?.data && (
                <FileViewer
                  mimeType={attachment.mimeType}
                  byteArray={attachment.data as unknown as string}
                >
                  <span className="underline">📄 {index + 1}</span>
                </FileViewer>
              )}
            </span>
          ))}
          {attachments?.length === 0 && <span>-</span>}
        </div>
      )
    },
  },
  {
    id: "link",
    header: "Link",
    accessorFn: (payment) => payment.OddJob?.discordLink,
    cell: ({ row, getValue }) => {
      const discordLink = getValue<string>()
      return (
        <div className="flex flex-row items-center justify-center gap-2">
          {discordLink ? (
            <Link
              href={discordLink}
              target="_blank"
              rel="noreferrer"
              className="text-gray-500 underline"
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
  {
    id: "fundingSource",
    accessorFn: (payment) => payment.fundingSource,
    header: "Funding Source",
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
  //           <Button variant="ghost" className="w-6 h-6 p-0">
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

export function AuditTableOddjobsDisplay() {
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: "createdAt",
      desc: true, // `false` for ascending, `true` for descending
    },
  ])

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
    fundingSource: false,
  })
  const [rowSelection, setRowSelection] = useState({})

  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 20,
  })

  // filters
  const [globalFilter, setGlobalFilter] = useState("")
  const debouncedGlobalFilter = useDebounce(globalFilter, 300)
  const [directorFilter, setDirectorFilter] = useState("")
  const debouncedDirectorFilter = useDebounce(directorFilter, 300)

  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [fundingSource, setFundingSource] = useState<string>("OpenGov-1130")

  const dataQuery = useQuery({
    queryKey: [
      "oddjobPayments",
      pagination,
      fundingSource,
      startDate,
      endDate,
      debouncedGlobalFilter,
      debouncedDirectorFilter,
    ],
    queryFn: async () => {
      const data = await getOddjobPaymentsGroupedByPostId({
        fundingSource,
        startDate,
        endDate,
        globalFilter: debouncedGlobalFilter,
        directorFilter: debouncedDirectorFilter,
        page: pagination.pageIndex.toString(),
        pageSize: pagination.pageSize.toString(),
      })
      return data
    },
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  })

  const isLoading = dataQuery.isLoading || dataQuery.isFetching

  const tableData = useMemo(() => {
    return isLoading
      ? (Array(pagination.pageSize)
          .fill({})
          .map((_, index) => ({ postId: index })) as any[])
      : dataQuery.data?.data ?? []
  }, [isLoading, pagination.pageSize, dataQuery.data?.data])

  const columnData = useMemo(() => {
    return isLoading
      ? columns.map((column) => ({
          ...column,
          cell: () => <Skeleton className="h-[20px]" />,
        }))
      : columns
  }, [isLoading])

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
    getGroupedRowModel: getGroupedRowModel(),
    onPaginationChange: setPagination,
    manualPagination: true,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination,
      globalFilter: debouncedGlobalFilter,
    },
    rowCount: dataQuery.data?.totalCount,
  })

  return (
    <div className="w-full">
      <div className="flex flex-wrap items-center gap-2 py-2">
        <Input
          placeholder={`Filter ${dataQuery.data?.totalCount ?? ""} entries`}
          value={globalFilter}
          onChange={(event) => {
            setGlobalFilter(event.target.value)
          }}
          className="w-64 h-9"
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
        <Input
          placeholder="Search for Director"
          value={directorFilter}
          onChange={(event) => {
            setDirectorFilter(event.target.value)
          }}
          className="w-64 h-9"
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
          <ExportButtonOddjobs
            table={table}
            fundingSource={fundingSource}
            startDate={startDate}
            globalFilter={globalFilter}
            endDate={endDate}
            directorFilter={directorFilter}
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
                <SelectItem value="250">250</SelectItem>
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
