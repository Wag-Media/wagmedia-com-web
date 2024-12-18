import React from "react"
import { ArrowRightIcon } from "lucide-react"

import Button from "@/components/Button/Button"
import Nav from "@/components/Nav/Nav"

import { Skeleton } from "../skeleton"

export default async function PostGridSkeleton() {
  const tabs = ["Latest", "Most Reactions", "Trending"]
  const posts = Array.from({ length: 12 })

  return (
    <div className={`nc-SectionGridPosts relative`}>
      <div className="flex justify-between mb-4">
        {/* <Nav
          className="sm:space-x-2 rtl:space-x-reverse"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            // <NavItem key={index}>{item}</NavItem>
            <div className="p-2 border-2 rounded-full" key={index}>
              {item}
            </div>
          ))}
        </Nav> */}
        {/* <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6">
          <span>View all</span>
          <ArrowRightIcon className="w-6 h-6 ms-3 rtl:rotate-180" />
        </Button> */}
      </div>
      <div className="mt-8">
        <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
          {posts.map((post) => (
            <div className="flex flex-col border-2 rounded-xl">
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
