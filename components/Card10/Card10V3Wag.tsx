"use client"

import React, { FC, useState } from "react"
import Link from "next/link"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"

import CardAuthor2 from "@/components/CardAuthor2/CardAuthor2"
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList"
import NcImage from "@/components/NcImage/NcImage"
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction"
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia"

import CategoryBadgeListWag from "../CategoryBadgeList/CategoryBadgeListWag"
import PostCardWagMeta from "../PostCardMeta/PostCardWagMeta"
import PostFeaturedWagMedia from "../PostFeaturedMedia/PostFeaturedWagMedia"

export interface Card10V3WagProps {
  className?: string
  post: PostWithTagsCategoriesReactionsPaymentsUser
  galleryType?: 1 | 2
}

const Card10V3Wag: FC<Card10V3WagProps> = ({
  className = "h-full",
  post,
  galleryType = 1,
}) => {
  const {
    id,
    title,
    content,
    slug,
    tags,
    categories,
    reactions,
    payments,
    embeds,
    createdAt,
    discordLink,
    user,
    earnings,
  } = post

  const href = `/post/${post.slug}`

  const [isHover, setIsHover] = useState(false)

  return (
    <div
      className={`nc-Card10V3Wag group relative flex flex-col ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <div className="block group rounded-lg flex-shrink-0 relative w-full aspect-w-16 aspect-h-16 sm:aspect-h-9 overflow-hidden z-0">
        <div>
          <PostFeaturedWagMedia post={post} isHover={isHover} />
        </div>

        <Link href={`/post/${post.slug}`} className="absolute inset-0"></Link>
      </div>
      <div className="absolute top-3 inset-x-3 flex justify-between items-start space-x-4 rtl:space-x-reverse">
        <CategoryBadgeListWag categories={categories} />
      </div>

      <div className="space-y-2.5 mt-4 px-4">
        <h2 className="nc-card-title block sm:text-lg font-semibold text-neutral-900 dark:text-neutral-100 ">
          <Link
            href={`/post/${post.slug}`}
            className="line-clamp-1"
            title={title}
          >
            {title}
          </Link>
        </h2>
        {/* <CardAuthor2
          className="mt-3"
          author={author}
          hoverReadingTime={false}
          date={date}
          readingTime={readingTime}
        /> */}
        <PostCardWagMeta meta={{ ...post }} />
      </div>
    </div>
  )
}

export default Card10V3Wag
