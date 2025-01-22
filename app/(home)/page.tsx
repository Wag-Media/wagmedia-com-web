import React, { Suspense } from "react"
import { getAuthorAvatars, getAuthors } from "@/data/dbAuthors"
import { getFeaturedPosts } from "@/data/dbPosts"

import NewsGrid from "@/components/ui/post-grid/NewsGrid"
import PostGrid from "@/components/ui/post-grid/PostGrid"
import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import BackgroundSection from "@/components/BackgroundSection/BackgroundSection"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import { Hero } from "@/components/Hero"
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor"
import SectionGridAuthorBoxWag from "@/components/SectionGridAuthorBox/SectionGridAuthorBoxWag"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"
import { FeaturedPostsSlider } from "@/components/featured-posts-slider"

import { fetchPosts } from "../actions/fetchPosts"

export const revalidate = 600 // seconds

const PageHome = async ({
  searchParams,
}: {
  searchParams: { search?: string; page?: string }
}) => {
  const search = searchParams?.search || ""
  const currentPage = Number(searchParams?.page) || 1

  const [authors, featuredPosts, latestPosts, authorAvatars] =
    await Promise.all([
      getAuthors({ limit: 10 }),
      getFeaturedPosts(),
      fetchPosts({
        search,
      }),
      getAuthorAvatars(),
    ])

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-grow">
        <Hero authorAvatars={authorAvatars} />
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container">
            <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
              Featured Posts
            </h2>
            <FeaturedPostsSlider featuredPosts={featuredPosts} />
          </div>
        </section>
        <Suspense fallback={<PostGridSkeleton />}>
          <PostGrid
            currentPage={currentPage}
            search={search}
            className="pt-16 pb-16 lg:pb-28"
            heading="Explore our latest posts"
          />
        </Suspense>
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
      </main>
    </div>
  )
}

export default PageHome
