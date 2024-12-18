import React, { FC } from "react"
import {
  getCategoriesNames,
  getCategoryWithArticlesAndNews,
  getLanguageWithArticlesAndNews,
} from "@/data/dbCategories"

import { deslugify, slugify } from "@/lib/slug"
import Card11Wag from "@/components/Card11/Card11Wag"
import Heading from "@/components/Heading/Heading"

import {
  NonAngloCategoryTitle,
  capitalizeFirstLetter,
  isCategoryNameLanguage,
} from "./util"

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

  const { articles, news, name } = category

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
          {!articles?.length ? null : (
            <>
              <Heading
                desc={`Read ${articles.length} articles${
                  news?.length ? ` and ${news.length} news` : ""
                } on Polkadot ${
                  isLanguage ? `in ${category.name}` : category.name
                } written by our community creators`}
              >
                {title} Articles
              </Heading>
              <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-4">
                {articles?.map((post) => (
                  <Card11Wag key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
          {!news?.length ? null : (
            <>
              <Heading
                desc={`Read decentralized news on Polkadot ${category.name}, collected from the web by our community finders`}
                className="mt-12"
              >
                {deslugify(params.slug)} News
              </Heading>
              <div className="grid gap-6 mt-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-4">
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

        {/* MORE SECTIONS */}
        {/* === SECTION 5 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="mx-auto mt-10 text-center md:mt-16">
            <ButtonSecondary loading>Show me more</ButtonSecondary>
          </div>
        </div> */}

        {/* === SECTION 5 === */}
        {/* <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}

        {/* SUBCRIBES */}
        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  )
}
