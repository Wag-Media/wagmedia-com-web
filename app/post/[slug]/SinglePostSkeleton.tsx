import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/prisma/prisma"
import { Embed, Tag } from "@prisma/client"

import { Skeleton } from "@/components/ui/skeleton"
import CategoryBadgeListWag from "@/components/CategoryBadgeList/CategoryBadgeListWag"
import NcImage from "@/components/NcImage/NcImage"
import PostMeta2 from "@/components/PostMeta2/PostMeta2"
import PostMeta2Wag from "@/components/PostMeta2/PostMeta2Wag"
import { WagImage } from "@/components/WagImage/WagImage"

import SingleAuthor from "../SingleAuthor"
import SingleContent from "../SingleContent"
import SingleMetaAction2 from "../SingleMetaAction2"
import SingleRelatedPosts from "../SingleRelatedPosts"
import SingleTitle from "../SingleTitle"

export async function SinglePostSkeleton({ title }: { title: string }) {
  return (
    <div className={`nc-PageSingle pt-8 lg:pt-16`}>
      <article className={`nc-PageSingle pt-8 lg:pt-16 space-y-10`}>
        <header className="rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <div className={`nc-SingleHeader`}>
              <div className="space-y-5">
                <div className="flex">
                  <Skeleton className="w-20 h-6 rounded-full mr-3" />
                  <Skeleton className="w-20 h-6 rounded-full" />
                </div>
                <SingleTitle title={title} />

                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                {/* <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
                  <PostMeta2Wag
                    size="large"
                    className="leading-none flex-shrink-0"
                    hiddenCategories
                    avatarRounded="rounded-full shadow-inner"
                    author={post.user}
                    date={post.createdAt}
                    categories={post.categories}
                  />
                  <SingleMetaAction2 />
                </div> */}
              </div>
            </div>
          </div>
        </header>
        <div
          id="single-entry-content"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          // ref={contentRef}
        >
          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <p className="mb-4 whitespace-break-spaces">
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
            <Skeleton className="w-full h-6 rounded-full mb-2" />
          </p>

          <div className="h-48"></div>
        </div>
      </article>
    </div>
  )
}
