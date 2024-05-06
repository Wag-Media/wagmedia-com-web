import React, { Suspense } from "react"
import { DEMO_AUTHORS } from "@/data/authors"
import { getAuthors } from "@/data/dbAuthors"
import { getFeaturedPosts, getPosts, getTotalPostCount } from "@/data/dbPosts"
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "@/data/posts"
import { DEMO_CATEGORIES } from "@/data/taxonomies"
import { cn } from "@/utils/cn"

import NewsGrid from "@/components/ui/post-grid/NewsGrid"
import PostGrid from "@/components/ui/post-grid/PostGrid"
import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Heading from "@/components/Heading/Heading"
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor"
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox"
import SectionGridAuthorBoxWag from "@/components/SectionGridAuthorBox/SectionGridAuthorBoxWag"
import { SectionSliderNewCategoriesWag } from "@/components/SectionSliderNewCategories/SectionSliderNewCategoriesWag"
// import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"

// import SectionSliderNewCategoriesWag from "../../components/SectionSliderNewCategories/SectionSliderNewCategoriesWag"
import SectionLargeSlider from "./SectionLargeSlider"
import { LargeSliderSkeleton } from "./SectionLargeSliderSkeleton"
import SectionLargeSliderWag from "./SectionLargeSliderWag"

const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16)
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7)

export const revalidate = 30 // seconds

const PageHome = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string }
}) => {
  const search = searchParams?.search || ""
  const currentPage = Number(searchParams?.page) || 1

  const authors = await getAuthors()

  return (
    <div className="nc-PageHome relative">
      <div className="container relative">
        {/* <div
            className={cn(
              "w-full z-10 backdrop-blur-lg bg-white/50 dark:dark:bg-neutral-900/50 py-12",
              "flex justify-center flex-col text-center"
            )}
          >
            <h2 className="text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-600 mb-4 leading-tight">
              Decentralized Media,
              <br />
              Collective Impact
            </h2>
            <span className="block text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
              WagMedia is shaping the Future of Blockchain Media Creation on
              Polkadot and Kusama
            </span>
          </div> */}
        <div className="relative">
          {/* <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-600 mb-4">
            Decentralized Media,
            <br />
            Collective Impact
          </h2>
          <span className="block mb-8 lg:mb-16 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
            WagMedia is shaping the Future of Blockchain Media Creation on
            Polkadot and Kusama
          </span> */}

          <div className="py-10 md:py-12 lg:py-12 text-center mt-4 z-10 relative">
            <h1 className="text-4xl md:text-[6.4vw] md:leading-[4.4vw] font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-fuchsia-600 to-pink-600 bg-clip-text text-transparent mb-4 drop-shadow-[4px_4px_#E6007A,4px_-4px_#f2f]">
              WagMedia
              <br />
              <span className="text-4xl">
                Decentralized Media Incubation Hub
              </span>
            </h1>
            <p className="block mb-8 lg:mb-16 text-xl text-gray-500">
              WagMedia decentralizes the story of Dotsama by incentivizing
              stakeholders to curate, share, create,
              <br /> and promote content of all languages in an open and
              transparent manner.
            </p>
          </div>
          {/* <div className="absolute mix-blend-multiply stroke-green-200 stroke filter blur-3xl  rounded-full bg-purple-300 w-3/12 h-4/6 top-1/2 -left-0 animate-blob delay-1000 opacity-50"></div> */}
          {/* <div className="absolute mix-blend-multiply stroke-green-200 stroke filter blur-3xl rounded-full bg-yellow-300 w-5/12 h-72 top-12 left-1/4 animate-blob delay-700 opacity-50"></div> */}
          {/* <div className="absolute mix-blend-multiply stroke-green-200 stroke filter blur-3xl rounded-full bg-pink-400 w-1/2 h-72 top-1/4 -right-10 animate-blob opacity-50"></div> */}
          <Suspense fallback={<LargeSliderSkeleton />}>
            <SectionLargeSliderWag />
          </Suspense>
        </div>
        {/* <SectionSliderPostsWag
          postCardName="card11"
          heading="Prominent Posts"
          posts={featuredPosts}
        /> */}
        <Suspense fallback={<PostGridSkeleton />}>
          <PostGrid
            currentPage={currentPage}
            search={search}
            className="pb-16 lg:pb-28 pt-16"
            heading="Explore our latest posts"
          />
        </Suspense>
      </div>

      <div className="container relative">
        {/* <SectionLargeSlider
          className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20"
          posts={DEMO_POSTS?.filter((_, i) => i < 3)}
        /> */}

        {/* <SectionLatestWagPosts className="pb-16 lg:pb-28" posts={posts} />

        <SectionMagazine1 className="py-16 lg:py-28" posts={MAGAZINE1_POSTS} /> */}

        <div className="relative pb-16 px-4 md:px-8 lg:px-12">
          <BackgroundSection />
          {/* <SectionGridAuthorBox
            className="py-8 lg:py-16"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          /> */}
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

        {/* <Suspense fallback={<div>Loading...</div>}>
          <SectionSliderNewCategoriesWag className="py-16 lg:py-28" />
        </Suspense> */}
        <Suspense fallback={<PostGridSkeleton />}>
          <NewsGrid
            currentPage={currentPage}
            search={search}
            className="pb-16 lg:pb-28 pt-16"
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
