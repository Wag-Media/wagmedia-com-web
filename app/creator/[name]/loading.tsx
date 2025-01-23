"use client"

import { useParams } from "next/navigation"

import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"

export default function Loading() {
  const params = useParams<{ name: string }>()
  if (!params?.name) return "Loading..."

  return (
    <div className={`nc-PageAuthor `}>
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72"></div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-lg md:rounded-[40px] flex flex-col md:flex-row">
            <div className="flex-shrink-0 w-32 mt-12 lg:w-40 sm:mt-0">
              <div className="relative z-0 inline-flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden text-xl font-semibold uppercase rounded-full shadow-2xl wil-avatar text-neutral-100 lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0"></div>
            </div>
            <div className="flex items-center flex-grow pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  <span>{decodeURIComponent(params.name)}</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <main>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="block w-full my-4 border-b border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
          </div>
          <PostGridSkeleton />
        </main>
      </div>
    </div>
  )
}
