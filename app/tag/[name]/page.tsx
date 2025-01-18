import React, { FC } from "react"
import { getCategories } from "@/data/dbCategories"
import { getPostsByTagId } from "@/data/dbPosts"
import { getTagByName } from "@/data/dbTags"

import Card11Wag from "@/components/Card11/Card11Wag"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"

export default async function PageTag({
  params,
}: {
  params: { name: string }
}) {
  const tag = await getTagByName(params.name)
  const categories = await getCategories()
  // const tags =

  if (!tag || !tag.name) {
    return {
      notFound: true,
    }
  }

  const posts = await getPostsByTagId(tag.id)

  // const FILTERS = [
  //   { name: "Most Recent" },
  //   { name: "Curated by Admin" },
  //   { name: "Most Appreciated" },
  //   { name: "Most Discussed" },
  //   { name: "Most Viewed" },
  // ]

  return (
    <div className={`nc-PageArchive`}>
      {/* HEADER */}
      <div className="w-full px-2 mx-auto xl:max-w-screen-2xl">
        <div className="relative aspect-[16/13] sm:aspect-[9/4] xl:aspect-[5] rounded-lg md:rounded-[40px] overflow-hidden z-0">
          {/* <Image
            alt="archive"
            fill
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full rounded-lg md:rounded-[40px]"
            sizes="(max-width: 1280px) 100vw, 1536px"
          /> */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-neutral-400">Tag</span>
            <h2 className="inline-block my-4 text-5xl font-semibold align-middle md:text-7xl">
              {tag.name}
            </h2>
            <span className="block text-xl">{posts.length} Posts</span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

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
          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-10">
            {posts?.map((post) => (
              <Card11Wag key={post.id} post={post} />
            ))}
          </div>

          {/* PAGINATIONS */}
          {/* <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div> */}
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
        <SectionSubscribe2 />
      </div>
    </div>
  )
}
