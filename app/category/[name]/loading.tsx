"use client"

import { useParams } from "next/navigation"

import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import LoadingSpinner from "@/components/Button/Loading"
import Heading from "@/components/Heading/Heading"

export default function Loading() {
  const params = useParams<{ name: string }>()
  if (!params?.name) return "Loading..."

  return (
    <div className={`nc-PageArchive`}>
      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-[16/13] sm:aspect-[9/4] xl:aspect-[5] rounded-lg md:rounded-[40px] overflow-hidden z-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-neutral-400">Category</span>
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl my-4">
              {params.name}
            </h2>
            <span className="block text-xl">
              <LoadingSpinner className="ml-2 inline-block" /> Articles and{" "}
              <LoadingSpinner className="ml-2 inline-block" /> News with the
              Category <b>{params.name}</b>
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container pt-10 pb-16 lg:pb-28 lg:pt-20 space-y-16 lg:space-y-28">
        <div>
          <div className="flex flex-col sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5 rtl:space-x-reverse">
              {/* <ModalCategories categories={categories} /> */}
              {/* <ModalTags tags={DEMO_TAGS} /> */}
            </div>
            <div className="block my-4 border-b w-full border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            {/* <div className="flex justify-end"
            >
              <ArchiveFilterListBox lists={FILTERS} />
            </div> */}
          </div>
          <Heading
            desc={`Read decentralized articles on Polkadot ${params.name} written by our community creators`}
          >
            {params.name} Articles
          </Heading>
          <PostGridSkeleton />
          <Heading
            desc={`Read decentralized news on Polkadot ${params.name}, collected from the web by our community finders`}
            className="mt-12"
          >
            {params.name} News
          </Heading>
          <PostGridSkeleton />
        </div>
      </div>
    </div>
  )
}
