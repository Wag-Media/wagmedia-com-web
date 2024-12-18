import React, { FC } from "react"
import Link from "next/link"
import { getCategoryOverview } from "@/data/dbCategories"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { ContentType } from "@prisma/client"

import { getPostFlag, postHasFlag } from "@/lib/utils"
import Badge from "@/components/Badge/Badge"
import Heading from "@/components/Heading/Heading"

import Button from "../Button/Button"
import Card11Wag from "../Card11/Card11Wag"

type expectedCategoryType = Awaited<ReturnType<typeof getCategoryOverview>> & {
  slug?: string
}

export interface SectionMagazine11Props {
  className?: string
  categories?: expectedCategoryType
  heading?: string
  desc?: string
  contentType?: ContentType
}

const CategoryOverview: FC<SectionMagazine11Props> = ({
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

    const categoryHref = category.link ?? `/category/${category.slug}`

    return (
      <div key={category.id} className={`flex flex-col space-y-4`}>
        {category.name && (
          <>
            <h2 className="mb-0 text-3xl font-bold">{category.name}</h2>
            <p className="pt-0 mt-0">{`${postsCount} total posts in ${category.name}`}</p>
          </>
        )}
        <div className="flex flex-col h-full">
          {posts[0] && <Card11Wag post={posts[0]} />}
          <ul className="mt-4 space-y-3">
            {posts
              .filter((_, i) => i > 0 && i < 5)
              .map((post) => {
                const flag = getPostFlag(post)
                return (
                  <li key={post.id}>
                    <h2 className="flex items-start space-x-4 font-medium nc-card-title rtl:space-x-reverse">
                      {flag ? (
                        <span className="ml-2 text-xl">
                          {getPostFlag(post)}
                        </span>
                      ) : (
                        <span className="w-2 h-2 !p-0 rounded flex-shrink-0 mt-2 ml-3 bg-gray-300"></span>
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

export default CategoryOverview
