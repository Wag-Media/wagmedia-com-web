import React from "react"
import { ArrowRightIcon } from "lucide-react"

import Button from "@/components/Button/Button"
import Nav from "@/components/Nav/Nav"

import { Skeleton } from "../skeleton"

export default async function PostGridSkeleton({ cols = 4 }) {
  const posts = Array.from({ length: 12 })

  return (
    <div className={`nc-SectionGridPosts relative`}>
      <div className="mt-8">
        <div
          className={`grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-${cols} lg:gap-8 xl:grid-cols-${cols}`}
        >
          {posts.map((post, index) => (
            <div className="flex flex-col border-2 rounded-xl" key={index}>
              <Skeleton className="w-full aspect-w-16 aspect-h-9 rounded-t-xl" />
              <div className="flex flex-col p-4">
                <div className="flex flex-row items-center w-full">
                  <Skeleton className="w-8 h-8 rounded-full" />
                  <Skeleton className="w-1/4 h-3 ml-2" /> ·{" "}
                  <Skeleton className="w-1/4 h-3 ml-2" />
                </div>
                <Skeleton className="w-full h-3 mt-3" />
                <Skeleton className="w-full h-3 mt-3" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
