import React, { FC } from "react"
import Link from "next/link"
import { categoryDescriptions } from "@/data/category-descriptions"
import { getCategoryOverview } from "@/data/dbCategories"
import { ArrowRightIcon } from "@heroicons/react/24/solid"
import { ContentType } from "@prisma/client"

import { getPostFlag, postHasFlag } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import Heading from "@/components/Heading/Heading"
import {
  removeHtmlTags,
  removeLinks,
  replaceAuthorLinks,
} from "@/app/post/[slug]/util"

import Card11Wag from "../Card11/Card11Wag"
import PostCardWagMeta from "../PostCardMeta/PostCardWagMeta"
import { Button } from "../ui/button"
import { Headline } from "../ui/headline"

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

const CategoryOverview: FC<SectionMagazine11Props> = async ({
  categories = [],
  className = "",
  heading = "Explore all Polkadot Article Categories",
  desc = "Polkadot Ecosystem Articles grouped by Category",
  contentType = ContentType.article,
}) => {
  const renderListByCat = async (
    category: expectedCategoryType[number] & {
      _count: { posts: number }
      link?: string
    }
  ) => {
    const posts = await Promise.all(
      category.posts.map(async (post) => {
        const title = await replaceAuthorLinks(post.title, false)
        return { ...post, title }
      })
    )
    const postsCount = category._count?.posts

    const categoryHref = category.link ?? `/category/${category.slug}`

    return (
      <div key={category.id} className={`flex flex-col`}>
        {category.name && (
          <Headline
            level="h2"
            containerClassName="mb-4"
            subtitle={
              categoryDescriptions[
                category.name.toLowerCase() as keyof typeof categoryDescriptions
              ]
            }
            subtitleClassName="text-sm text-left line-clamp-3"
            // subtitle={`${postsCount} Total ${
            //   contentType === ContentType.article ? "Articles" : "News"
            // } in ${category.name}`}
          >
            {category.name}
          </Headline>
        )}

        <div className="flex flex-col h-full">
          {posts[0] && <Card11Wag post={posts[0]} />}
          <ul className="mx-4 mt-4 space-y-3">
            {posts
              .filter((_, i) => i > 0 && i < 5)
              .map((post) => {
                const flag = getPostFlag(post)
                return (
                  <li key={post.id} className="">
                    <Link
                      href={`/post/${post.slug}`}
                      title={post.title}
                      className="flex flex-col"
                    >
                      <h4 className="flex items-center mb-1 leading-tight text-gray-900 dark:text-white text-normal font-unbounded">
                        {flag ? (
                          <span className="mr-2 text-xl">
                            {getPostFlag(post)}
                          </span>
                        ) : null}
                        {post.title}
                      </h4>
                      <div className="flex flex-row justify-between">
                        <PostCardWagMeta
                          user={post.user}
                          createdAt={post.createdAt}
                          avatarSize="h-5 w-5 text-sm"
                        />
                      </div>
                    </Link>
                  </li>
                )
              })}
          </ul>
        </div>
        <div className="flex items-center justify-start my-6">
          {/* @ts-ignore */}
          <Link href={categoryHref}>
            <Button variant="ghost" className="text-[var(--secondary-color)]">
              <span>
                See all {postsCount} {category.name}{" "}
                {contentType === ContentType.article ? "Articles" : "News"}
              </span>
              <ArrowRightIcon className="ms-1.5 w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-SectionMagazine11 relative ${className}`}>
      <Headline level="h1" subtitle={desc}>
        {heading}
      </Headline>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-4 md:gap-7">
        {categories.map((cate, i) => renderListByCat(cate))}
      </div>
    </div>
  )
}

export default CategoryOverview
