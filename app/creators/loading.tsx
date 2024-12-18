"use client"

import { useParams } from "next/navigation"

import { deslugify } from "@/lib/slug"
import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import LoadingSpinner from "@/components/Button/Loading"
import Heading from "@/components/Heading/Heading"

export default function Loading() {
  return (
    <div className={`nc-PageArchive`}>
      <div className="py-4 md:py-8 lg:py-16">
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              {/* <ModalCategories categories={categories} /> */}
              {/* <ModalTags tags={DEMO_TAGS} /> */}
            </div>
            <div className="block w-full my-4 border-b border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            {/* <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div> */}
          </div>
          <Heading
            desc={`Our group of creators will help you identify content of interest, enabling you to deepen your understanding of Polkadot.`}
          >
            WagMedia Polkadot Creators
          </Heading>
          <PostGridSkeleton />
          <Heading desc={``} className="mt-12">
            {/* {params.slug} News */}
          </Heading>
          <PostGridSkeleton />
        </div>
      </div>
    </div>
  )
}
