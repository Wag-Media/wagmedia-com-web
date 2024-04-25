import React from "react"

import { Skeleton } from "@/components/ui/skeleton"
import NextPrev from "@/components/NextPrev/NextPrev"

export function LargeSliderSkeleton() {
  return (
    <div
      className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse md:flex-row justify-end`}
    >
      <div className="md:absolute z-10 md:start-0 md:top-1/2 md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <Skeleton className="h-[17rem]">
          <div className="">
            {/* <CategoryBadgeListWag categories={categories} /> */}

            <h2 className="nc-card-title text-base sm:text-xl lg:text-2xl font-semibold "></h2>

            {/* <CardAuthor2Wag className="relative" author={user} date={createdAt} /> */}

            {/* <div className="flex items-center justify-between mt-auto">
            <PostCardLikeAndComment />
            <PostCardSaveAction bookmarkClass="h-8 w-8 bg-neutral-50/30 hover:bg-neutral-50/50 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/50" />
          </div> */}
          </div>
        </Skeleton>
        <div className="p-4 sm:pt-8 sm:px-10">
          <NextPrev btnClassName="w-11 h-11 text-xl" />
        </div>
      </div>

      <Skeleton className="w-full md:w-4/5 lg:w-2/3">
        <div className="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative" />

        <div className="absolute inset-0 object-cover rounded-lg"></div>
        {/* META TYPE */}
        {/* <PostTypeFeaturedIcon
            postType={post.postType}
            className="absolute w-8 h-8 md:w-10 md:h-10 right-6 top-6"
          /> */}
      </Skeleton>
    </div>
  )
}
