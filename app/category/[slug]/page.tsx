import React, { FC } from "react"
import { redirect } from "next/navigation"
import { categoryDescriptions } from "@/data/category-descriptions"
import {
  getCategoriesNames,
  getCategoryWithArticlesAndNews,
} from "@/data/dbCategories"
import { getPostsByCategoryId, getPostsByLanguage } from "@/data/dbPosts"
import { TypePostOrder } from "@/data/types"
import { getFlagByLanguage } from "@/data/util"
import { prisma } from "@/prisma/prisma"
import { Category } from "@prisma/client"

import { deslugify, slugify } from "@/lib/slug"
import { Headline } from "@/components/ui/headline"
import { PostGridDisplay } from "@/components/ui/post-grid/PostGridDisplay"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import CategoryIntroCard from "./category-intro-card"
import { NonAngloCategoryTitle, isCategoryNameLanguage } from "./util"

export async function generateStaticParams() {
  const categories = await getCategoriesNames()
  return categories.map((categoryName) => ({ slug: slugify(categoryName) }))
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  return {
    title: `All ${deslugify(params.slug)} Articles`,
    description: `Read all ${deslugify(params.slug)} articles on Polkadot`,
  }
}

export default async function PageCategory({
  params,
}: {
  params: { slug: string }
}) {
  if (params.slug === "tip") {
    redirect("/agent-tipping")
  }

  const isLanguage = isCategoryNameLanguage(params.slug)
  const flag = getFlagByLanguage(params.slug)

  const nonAngloCategoryId = await prisma.category.findFirst({
    where: {
      name: "Non Anglo",
    },
  })

  const category = await getCategoryWithArticlesAndNews(
    isLanguage ? nonAngloCategoryId?.name! : params.slug
  )

  if (!category || !category.name || !category.id) {
    return <>not found</>
  }

  const { name, articlesCount, newsCount } = category

  let initialArticles = isLanguage
    ? await getPostsByLanguage({ flag, page: 0, pageSize: 11 })
    : await getPostsByCategoryId(
        isLanguage ? nonAngloCategoryId?.id! : category.id!,
        "article",
        0,
        11
      )

  initialArticles = await Promise.all(
    initialArticles.map(async (post) => ({
      ...post,
      title: await replaceAuthorLinks(post.title, false),
    }))
  )

  let initialNews = await getPostsByCategoryId(category.id!, "news", 0, 11)

  initialNews = await Promise.all(
    initialNews.map(async (post) => ({
      ...post,
      title: await replaceAuthorLinks(post.title, false),
    }))
  )

  const loadMoreArticles = async (
    page: number,
    orderBy?: any,
    search?: string,
    contentType?: "article" | "news"
  ) => {
    "use server"

    const posts = await getPostsByCategoryId(
      category.id!,
      contentType || "article",
      11 + (page - 1) * 12,
      12
    )

    // Process titles with author links
    return await Promise.all(
      posts.map(async (post) => {
        const title = await replaceAuthorLinks(post.title, false)
        return { ...post, title }
      })
    )
  }

  const loadMoreNews = async (
    page: number,
    orderBy?: TypePostOrder,
    search?: string,
    contentType: "article" | "news" = "news"
  ) => {
    "use server"
    const posts = await getPostsByCategoryId(
      category.id!,
      contentType,
      page * 12,
      12
    )

    return Promise.all(
      posts.map(async (post) => ({
        ...post,
        title: await replaceAuthorLinks(post.title, false),
      }))
    )
  }

  if (initialArticles.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        No articles found for {params.slug}
      </div>
    )
  }

  const title = name ? NonAngloCategoryTitle(deslugify(params.slug)) : ""

  return (
    <div className="container pt-10 pb-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
      <div>
        {!initialArticles?.length ? null : (
          <>
            <Headline level="h1" containerClassName="mb-16">
              {title} Articles
            </Headline>
            <PostGridDisplay
              initialPosts={initialArticles}
              introCard={
                <CategoryIntroCard
                  category={category as Category}
                  articlesCount={articlesCount}
                  newsCount={newsCount}
                  isLanguage={isLanguage}
                  title={title}
                />
              }
              totalPostCount={articlesCount}
              loadMorePostsPromise={loadMoreArticles}
              contentType="article"
            />
          </>
        )}
        {newsCount > 0 && (
          <>
            <Headline level="h2" containerClassName="my-16">
              {deslugify(params.slug)} News
            </Headline>
            <PostGridDisplay
              initialPosts={initialNews}
              totalPostCount={newsCount}
              loadMorePostsPromise={loadMoreNews}
              contentType="news"
            />
          </>
        )}
      </div>
    </div>
  )
}
