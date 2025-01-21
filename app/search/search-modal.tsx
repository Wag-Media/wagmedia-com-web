"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { LifebuoyIcon } from "@heroicons/react/24/outline"
import { useAction } from "next-safe-action/hooks"

import { cn } from "@/lib/utils"
import { useDebounce } from "@/hooks/use-debounce"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { searchAction } from "./search-action"
import { SearchInput } from "./search-input"
import { SearchResults } from "./search-results"

interface SearchModalProps {
  isOpen: boolean
}

export function SearchModal() {
  const [query, setQuery] = useState("")
  const [isOpen, setIsOpen] = useState(false)
  const debouncedQuery = useDebounce(query, 300)
  const router = useRouter()

  const { execute, result, status } = useAction(searchAction)

  const handleSearch = (value: string) => {
    setQuery(value)
    router.push(`${window.location.pathname}?q=${value}`)
  }

  useEffect(() => {
    // get query from url search params
    const query = new URLSearchParams(window.location.search).get("q")
    setQuery(query || "")
  }, [])

  useEffect(() => {
    execute({ query: debouncedQuery || "" })
  }, [debouncedQuery, execute])

  // Show results if we have data, are loading, or query is empty
  const shouldShowResults =
    status === "executing" || result?.data || query === ""

  return (
    <>
      {" "}
      <button
        className="flex items-center self-center justify-center w-12 h-12 text-2xl rounded-full text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl backdrop-blur-md"
        onClick={() => setIsOpen(true)}
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] p-0 rounded-sm">
          <SearchInput value={query} onChange={handleSearch} />
          {query === "?" ? (
            <div className="px-6 text-sm text-center py-14 sm:px-14">
              <LifebuoyIcon
                className="w-6 h-6 mx-auto text-gray-400 dark:text-gray-100"
                aria-hidden="true"
              />
              <p className="mt-4 font-semibold text-gray-900 dark:text-gray-100">
                Help with searching
              </p>
              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Use this tool to quickly search for users and projects across
                our entire platform. You can also use the search modifiers found
                in the footer below to limit the results to just users or
                projects.
              </p>
            </div>
          ) : (
            shouldShowResults && (
              <div className="px-4 py-0">
                <SearchResults
                  isLoading={status === "executing"}
                  query={query}
                  results={{
                    posts: result?.data?.data?.posts || [],
                    authors: result?.data?.data?.authors || [],
                    categories: result?.data?.data?.categories || [],
                  }}
                  onClose={() => setIsOpen(false)}
                />
              </div>
            )
          )}
          <DialogFooter className="flex flex-wrap items-center flex-row !justify-start bg-gray-50 dark:bg-gray-900 py-2.5 px-4 text-xs text-gray-700 dark:text-gray-100 rounded-b-sm">
            Type{" "}
            <kbd
              className={cn(
                "!mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-900 dark:text-gray-100 font-semibold sm:mx-2",
                query.startsWith("#")
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-400 text-gray-900"
              )}
            >
              #
            </kbd>{" "}
            <span className="sm:hidden">for projects,</span>
            <span className="hidden !mx-0 sm:inline">to access posts,</span>
            <kbd
              className={cn(
                "!mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-900 dark:text-gray-100 font-semibold sm:mx-2",
                query.startsWith("@")
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-400 text-gray-900"
              )}
            >
              @
            </kbd>{" "}
            for authors,
            <kbd
              className={cn(
                "!mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-900 dark:text-gray-100 font-semibold sm:mx-2",
                query.startsWith(".")
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-400 text-gray-900"
              )}
            >
              .
            </kbd>{" "}
            for categories, or{" "}
            <kbd
              className={cn(
                "!mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white dark:bg-gray-900 dark:text-gray-100 font-semibold sm:mx-2",
                query === "?"
                  ? "border-indigo-600 text-indigo-600"
                  : "border-gray-400 text-gray-900"
              )}
            >
              ?
            </kbd>{" "}
            for help
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
