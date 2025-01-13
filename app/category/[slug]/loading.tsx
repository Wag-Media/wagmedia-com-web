"use client"

import { useParams } from "next/navigation"

import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import Heading from "@/components/Heading/Heading"

import { deslugify } from "../../../lib/slug"

export default function Loading() {
  const params = useParams<{ slug: string }>()
  if (!params?.slug) return "Loading..."

  return (
    <div className={`nc-PageArchive`}>
      <div className="container pt-10 pb-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
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
            desc={`Our extensive range of ${deslugify(
              params.slug
            )} articles will help you identify content of interest, enabling you to deepen your understanding of Polkadot.`}
          >
            {deslugify(params.slug)} Articles
          </Heading>
          <PostGridSkeleton />
          <Heading
            desc={`Our extensive range of ${deslugify(
              params.slug
            )} news will help you identify content of interest, enabling you to deepen your understanding of Polkadot.`}
          >
            {deslugify(params.slug)} News
          </Heading>
          <PostGridSkeleton />
        </div>
      </div>
    </div>
  )
}
