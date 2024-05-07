import React, { FC } from "react"
import Link from "next/link"
import {
  getCategoriesWithPosts,
  getCategoryOverview,
} from "@/data/dbCategories"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { ContentType } from "@prisma/client"

import { getPostFlag, postHasFlag } from "@/lib/utils"
import Badge from "@/components/Badge/Badge"
import Heading from "@/components/Heading/Heading"

import Button from "../Button/Button"
import Card11Wag from "../Card11/Card11Wag"

type expectedCategoryType = Awaited<ReturnType<typeof getCategoryOverview>>

export interface SectionMagazine11Props {
  className?: string
  categories?: expectedCategoryType
  heading?: string
  desc?: string
  contentType?: ContentType
}

const SectionMagazine11Wag: FC<SectionMagazine11Props> = ({
  categories = [],
  className = "",
  heading = "Explore all Polkadot Article Categories",
  desc = "Polkadot Ecosystem Articles grouped by Category",
  contentType = ContentType.article,
}) => {
  const renderListByCat = (
    category: expectedCategoryType[number] & {
      _count: { posts: number }
      link?: string
    }
  ) => {
    const posts = category.posts
    const postsCount = category._count?.posts

    const categoryHref =
      category.link ?? `/category/${encodeURIComponent(category.name)}`

    return (
      <div key={category.id} className={`flex flex-col space-y-4`}>
        {category.name && (
          <>
            <h2 className="text-3xl font-bold mb-0">{category.name}</h2>
            <p className="pt-0 mt-0">{`${postsCount} total posts in ${category.name}`}</p>
          </>
        )}
        <div className="flex flex-col h-full">
          {posts[0] && <Card11Wag post={posts[0]} />}
          <ul className="space-y-3 mt-4">
            {posts
              .filter((_, i) => i > 0 && i < 5)
              .map((post) => {
                const flag = getPostFlag(post)
                return (
                  <li key={post.id}>
                    <h2 className="nc-card-title flex items-start font-medium space-x-4 rtl:space-x-reverse">
                      {flag ? (
                        <span className="ml-2 text-xl">
                          {getPostFlag(post)}
                        </span>
                      ) : (
                        <Badge
                          className="w-2.5 h-2.5 !p-0 rounded flex-shrink-0 mt-2 ml-3"
                          name={""}
                          // color={category.color as TwMainColor}
                        />
                      )}
                      <Link
                        href={`/post/${post.slug}`}
                        title={post.title}
                        className="flex"
                      >
                        {post.title}
                      </Link>
                    </h2>
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="flex items-center justify-between !mt-8 !mb-8">
          {/* @ts-ignore */}
          <Button href={categoryHref}>
            <span>
              See all {category.name}{" "}
              {contentType === ContentType.article ? "Articles" : "News"}
            </span>
            <ArrowRightIcon className="ms-1.5 w-3 h-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-SectionMagazine11 relative ${className}`}>
      <Heading as="h1" desc={desc}>
        {heading}
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-4 md:gap-7">
        {categories.map((cate, i) => renderListByCat(cate))}
      </div>
    </div>
  )
}

export default SectionMagazine11Wag
