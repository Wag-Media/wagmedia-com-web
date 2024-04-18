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

import PostGrid from "@/components/ui/post-grid/PostGrid"
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection"
import Heading from "@/components/Heading/Heading"
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor"
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox/SectionGridAuthorBox"
import SectionGridAuthorBoxWag from "@/components/SectionGridAuthorBox/SectionGridAuthorBoxWag"
import { SectionSliderNewCategoriesWag } from "@/components/SectionSliderNewCategories/SectionSliderNewCategoriesWag"
// import SectionSliderNewCategories from "@/components/SectionSliderNewCategories/SectionSliderNewCategories"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"
import SectionLatestWagPosts from "@/components/Sections/SectionLatestPostsWag"
import SectionMagazine1 from "@/components/Sections/SectionMagazine1"
import SectionMagazine2 from "@/components/Sections/SectionMagazine2"
import SectionSliderPosts from "@/components/Sections/SectionSliderPosts"
import SectionSliderPostsWag from "@/components/Sections/SectionSliderPostsWag"
import SectionVideos from "@/components/Sections/SectionVideos"

// import SectionSliderNewCategoriesWag from "../../components/SectionSliderNewCategories/SectionSliderNewCategoriesWag"
import SectionLargeSlider from "./SectionLargeSlider"
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
        <div className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-20">
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-purple-400 to-cyan-600 mb-4">
            Decentralized Media,
            <br />
            Collective Impact
          </h2>
          <span className="block mb-8 lg:mb-16 text-base xl:text-lg text-neutral-6000 dark:text-neutral-400">
            WagMedia is shaping the Future of Blockchain Media Creation on
            Polkadot and Kusama
          </span>
          <Suspense fallback={<>Loading...</>}>
            <SectionLargeSliderWag />
          </Suspense>
        </div>
        {/* <SectionSliderPostsWag
          postCardName="card11"
          heading="Prominent Posts"
          posts={featuredPosts}
        /> */}
        <Suspense fallback={<div>Loading...</div>}>
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
          <SectionBecomeAnAuthor className="" />
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <SectionSliderNewCategoriesWag className="py-16 lg:py-28" />
        </Suspense>
      </div>

      <div className="container ">
        <SectionSubscribe2 className="pt-16 lg:pt-28" />
      </div>
    </div>
  )
}

export default PageHome
