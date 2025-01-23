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

  if (!tag || !tag.name) {
    return {
      notFound: true,
    }
  }

  const posts = await getPostsByTagId(tag.id)

  return (
    <div className={`nc-PageArchive`}>
      <div className="w-full px-2 mx-auto xl:max-w-screen-2xl">
        <div className="relative aspect-[16/13] sm:aspect-[9/4] xl:aspect-[5] rounded-lg md:rounded-[40px] overflow-hidden z-0">
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-neutral-400">Tag</span>
            <h2 className="inline-block my-4 text-5xl font-semibold align-middle md:text-7xl">
              {tag.name}
            </h2>
            <span className="block text-xl">{posts.length} Posts</span>
          </div>
        </div>
      </div>

      <div className="container pt-10 pb-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
        <div>
          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-10">
            {posts?.map((post) => (
              <Card11Wag key={post.id} post={post} />
            ))}
          </div>
        </div>
        <SectionSubscribe2 />
      </div>
    </div>
  )
}
