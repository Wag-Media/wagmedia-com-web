import React, { FC } from "react"
import { redirect } from "next/navigation"
import { categoryDescriptions } from "@/data/category-descriptions"
import {
  getCategoriesNames,
  getCategoryWithArticlesAndNews,
  getLanguageWithArticlesAndNews,
} from "@/data/dbCategories"

import { deslugify, slugify } from "@/lib/slug"
import { Headline } from "@/components/ui/headline"
import Card11Wag from "@/components/Card11/Card11Wag"
import Heading from "@/components/Heading/Heading"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

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

  let category

  // as language is not a real category, we need to handle it differently
  if (isLanguage) {
    category = await getLanguageWithArticlesAndNews(params.slug)
  } else {
    category = await getCategoryWithArticlesAndNews(params.slug)
  }

  if (!category || !category.name) {
    return <>not found</>
  }

  const { articles, news, name, articlesCount, newsCount } = category

  const posts = await Promise.all(
    articles.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  if (posts.length === 0) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        No articles found for {params.slug}
      </div>
    )
  }

  const title = name ? NonAngloCategoryTitle(deslugify(params.slug)) : ""

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
          {/* LOOP ITEMS */}
          {!posts?.length ? null : (
            <>
              <Headline level="h1" containerClassName="mb-16">
                {title} Articles
              </Headline>
              <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-4">
                <div className="pr-4 text-right">
                  <p className="w-full text-gray-600 dark:text-gray-400">
                    {category?.name &&
                      categoryDescriptions[
                        category.name.toLowerCase() as keyof typeof categoryDescriptions
                      ]}
                  </p>
                  <p className="w-full mt-4 text-sm text-gray-600 dark:text-gray-400">{`Read a total of ${articlesCount} articles${
                    newsCount ? ` and ${newsCount} news` : ""
                  } on Polkadot ${
                    isLanguage ? `in ${title}` : category.name
                  } written by our community creators`}</p>
                </div>
                {posts?.map((post) => (
                  <Card11Wag key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
          {!news?.length ? null : (
            <>
              <Heading
                desc={`Read decentralized news on Polkadot ${category.name}, collected from the web by our community finders`}
                className="mt-24 mb-12"
              >
                {deslugify(params.slug)} News
              </Heading>
              <div className="grid gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-4">
                {news?.map((post) => (
                  <Card11Wag key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            {/* <Pagination /> */}
            {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
          </div>
        </div>
      </div>
    </div>
  )
}
