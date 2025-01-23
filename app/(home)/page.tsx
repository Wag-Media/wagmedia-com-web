import React, { Suspense } from "react"
import {
  getAuthorAvatars,
  getAuthors,
  getTotalAuthorCount,
} from "@/data/dbAuthors"
import {
  getFeaturedPosts,
  getTotalPostCount,
  getTotalPostPaymentAmount,
} from "@/data/dbPosts"

import { Headline } from "@/components/ui/headline"
import NewsGrid from "@/components/ui/post-grid/NewsGrid"
import PostGrid from "@/components/ui/post-grid/PostGrid"
import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor/SectionBecomeAnAuthor"
import SectionGridAuthorBoxWag from "@/components/SectionGridAuthorBox/SectionGridAuthorBoxWag"
import { FeaturedPostsSlider } from "@/components/featured-posts-slider"
import { Hero } from "@/components/hero"
import { SectionSubscribeNewsletter } from "@/components/section-subscribe-newsletter"

import { fetchPosts } from "../actions/fetchPosts"
import { replaceAuthorLinks } from "../post/[slug]/util"

export const revalidate = 600 // seconds

const PageHome = async ({
  searchParams,
}: {
  searchParams: { articles?: string; search?: string; page?: string }
}) => {
  const articles = searchParams?.articles || "latest"
  const search = searchParams?.search || ""
  const currentPage = Number(searchParams?.page) || 1

  const [
    authors,
    featuredPosts,
    latestPosts,
    popularPosts,
    totalPostCount,
    totalAuthorCount,
    authorAvatars,
    totalPostPaymentAmount,
  ] = await Promise.all([
    getAuthors({ limit: 10 }),
    getFeaturedPosts(),
    fetchPosts({
      search,
      orderBy: "latest",
    }),
    fetchPosts({
      search,
      orderBy: "reactions",
    }),
    getTotalPostCount(),
    getTotalAuthorCount(),
    getAuthorAvatars(),
    getTotalPostPaymentAmount(),
  ])

  const processedLatestPosts = await Promise.all(
    latestPosts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  const processedPopularPosts = await Promise.all(
    popularPosts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  return (
    <div className="flex flex-col min-h-svh">
      <main className="flex-grow">
        <Hero
          authorAvatars={authorAvatars}
          totalPostCount={totalPostCount}
          totalAuthorCount={totalAuthorCount}
          totalPostPaymentAmount={totalPostPaymentAmount._sum.amount}
        />
        <section className="py-12 sm:py-12 lg:py-20">
          <div className="container">
            <Headline level="h2">Featured Posts</Headline>
            <FeaturedPostsSlider featuredPosts={featuredPosts} />
          </div>
        </section>
        <Suspense fallback={<PostGridSkeleton />}>
          <PostGrid
            articleOrder={articles}
            popularPosts={processedPopularPosts}
            latestPosts={processedLatestPosts}
          />
        </Suspense>
        <div className="container relative">
          <div className="relative px-4 pb-16 md:px-8 lg:px-12">
            <SectionGridAuthorBoxWag
              className="py-8 lg:py-16"
              authors={authors}
            />
          </div>
        </div>
        <SectionBecomeAnAuthor />
        <div className="container ">
          <Suspense fallback={<PostGridSkeleton />}>
            <NewsGrid
              currentPage={currentPage}
              search={search}
              className="pt-16 pb-16 lg:pb-28"
              heading="Explore our latest posts"
            />
          </Suspense>
        </div>
        <SectionSubscribeNewsletter />
      </main>
    </div>
  )
}

export default PageHome
