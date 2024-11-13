import React, { Suspense } from "react"
import { getAuthors } from "@/data/dbAuthors"

import NewsGrid from "@/components/ui/post-grid/NewsGrid"
import PostGrid from "@/components/ui/post-grid/PostGrid"
import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor"
import SectionGridAuthorBoxWag from "@/components/SectionGridAuthorBox/SectionGridAuthorBoxWag"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"

import { LargeSliderSkeleton } from "./SectionLargeSliderSkeleton"
import SectionLargeSliderWag from "./SectionLargeSliderWag"

export const revalidate = 600 // seconds

const PageHome = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string }
}) => {
  const search = searchParams?.search || ""
  const currentPage = Number(searchParams?.page) || 1

  const authors = await getAuthors()

  return (
    <div className="relative nc-PageHome">
      <div className="container relative">
        <div className="relative">
          <div className="relative z-10 flex flex-col items-center py-10 mt-4 text-center md:py-12 lg:py-12">
            {/* <h1 className="text-4xl md:text-[6.4vw] md:leading-[4.4vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-[#f9b900] to-[#b51800] bg-clip-text text-transparent mb-4 drop-shadow-[4px_4px_#E6007A,4px_-4px_#f2f]">
              WagMedia
              <br />
              <span className="text-4xl">
                Decentralized Media Incubation Hub
              </span>
            </h1> */}
            <h1 className="max-w-4xl text-6xl md:text-9xl font-outline md:font-outline-3 lg:font-outline-3  shadow-[#b51800] font-extrabold text-[#f9b900] mb-4 drop-shadow-[4px_4px_#E6007A,4px_-4px_#f2f]">
              WagMedia
              {/* <br /> */}
              {/* <span className="block mt-4 text-3xl leading-none font-outline md:mt-8">
                Decentralized Media Incubation Hub
              </span> */}
            </h1>
            <p className="block mt-2 mb-8 text-gray-400 lg:mb-16 lg:text-xl md:mt-6">
              WagMedia decentralizes the story of Dotsama by incentivizing
              stakeholders to curate, share, create,
              <br /> and promote content of all languages in an open and
              transparent manner.
            </p>
          </div>

          <Suspense fallback={<LargeSliderSkeleton />}>
            <SectionLargeSliderWag />
          </Suspense>
        </div>

        <Suspense fallback={<PostGridSkeleton />}>
          <PostGrid
            currentPage={currentPage}
            search={search}
            className="pt-16 pb-16 lg:pb-28"
            heading="Explore our latest posts"
          />
        </Suspense>
      </div>

      <div className="container relative">
        <div className="relative px-4 pb-16 md:px-8 lg:px-12">
          <BackgroundSection />
          <SectionGridAuthorBoxWag
            className="py-8 lg:py-16"
            authors={authors}
          />
          <SectionBecomeAnAuthor className="">
            <ButtonPrimary className="mt-8" href="/about#join">
              Join WagMedia
            </ButtonPrimary>
          </SectionBecomeAnAuthor>
        </div>
        <Suspense fallback={<PostGridSkeleton />}>
          <NewsGrid
            currentPage={currentPage}
            search={search}
            className="pt-16 pb-16 lg:pb-28"
            heading="Explore our latest posts"
          />
        </Suspense>
      </div>
      <div className="container ">
        <SectionSubscribe2 className="pt-16 lg:pt-28" />
      </div>
    </div>
  )
}

export default PageHome
