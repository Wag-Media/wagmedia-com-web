import React, { FC } from "react"
import {
  getCategoryWithArticlesAndNews,
  getLanguageWithArticlesAndNews,
} from "@/data/dbCategories"

import Card11Wag from "@/components/Card11/Card11Wag"
import Heading from "@/components/Heading/Heading"

import {
  NonAngloCategoryTitle,
  capitalizeFirstLetter,
  isCategoryNameLanguage,
} from "./util"

export const metadata = {
  title: "Category Page",
}

export default async function PageCategory({
  params,
}: {
  params: { name: string }
}) {
  const isLanguage = isCategoryNameLanguage(params.name)

  let category

  // as language is not a real category, we need to handle it differently
  if (isLanguage) {
    category = await getLanguageWithArticlesAndNews(params.name)
  } else {
    category = await getCategoryWithArticlesAndNews(params.name)
  }

  if (!category || !category.name || !category) {
    return <>not found</>
  }

  const { articles, news } = category

  const title = NonAngloCategoryTitle(category.name)

  return (
    <div className={`nc-PageArchive`}>
      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="relative aspect-[16/13] sm:aspect-[9/4] xl:aspect-[5] rounded-lg md:rounded-[40px] overflow-hidden z-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-neutral-400">
              {isLanguage && "Non-Anglo "}Category
            </span>
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl my-4">
              {title}
            </h2>
            <span className="block text-xl">
              {articles?.length} Articles{" "}
              {news?.length ? `and ${news?.length} News ` : null}
              with the Category <b>{category.name}</b>
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
            {/* <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div> */}
          </div>
          {/* LOOP ITEMS */}
          {!articles?.length ? null : (
            <>
              <Heading
                desc={`Read decentralized articles on Polkadot ${
                  isLanguage ? `in ${category.name}` : `${category.name}`
                } written by our community creators`}
              >
                {capitalizeFirstLetter(category.name)} Articles
              </Heading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4 lg:mt-4">
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
                {category.name} News
              </Heading>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-4 lg:mt-4">
                {news?.map((post) => (
                  <Card11Wag key={post.id} post={post} />
                ))}
              </div>
            </>
          )}
          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
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
          <div className="text-center mx-auto mt-10 md:mt-16">
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
