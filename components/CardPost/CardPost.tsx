import React, { FC } from "react"
import Link from "next/link"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList"
import NcImage from "@/components/NcImage/NcImage"
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment"
import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon"

import PostCardWagMeta from "../PostCardMeta/PostCardWagMeta"

export interface CardPostProps {
  className?: string
  post: PostWithTagsCategoriesReactionsPaymentsUser
}

export const CardPost: FC<CardPostProps> = ({ className = "h-full", post }) => {
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
  } = post

  const firstEmbed = post.embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage

  return (
    <div
      className={`nc-Card3 relative flex flex-row items-center group ${className}`}
    >
      <div className="flex flex-col flex-grow">
        <div className="space-y-3.5">
          {/* <CategoryBadgeList categories={categories} /> */}
          <Link href={`/post/${post.slug}`} className="block">
            <h2
              className={`nc-card-title block font-medium sm:font-semibold text-neutral-900 dark:text-neutral-100 text-sm sm:text-base xl:text-lg`}
            >
              <span className="line-clamp-2" title={title}>
                {title}
              </span>
            </h2>
            <div className="hidden sm:block sm:mt-2">
              <span className="text-neutral-500 dark:text-neutral-400 text-sm line-clamp-2">
                {content}
              </span>
            </div>
          </Link>

          <PostCardWagMeta meta={{ ...post }} />
        </div>
        <div className="mt-5 flex items-center flex-wrap justify-between">
          <PostCardLikeAndComment />
          {/* <PostCardSaveAction readingTime={readingTime} /> */}
        </div>
      </div>

      <div
        className={`block flex-shrink-0 w-24 sm:w-36 md:w-44 xl:w-56 ms-3 sm:ms-6 rounded-lg overflow-hidden z-0 mb-5 sm:mb-0`}
      >
        <Link
          href={`/post/${post.slug}`}
          className="block w-full h-0 aspect-h-1 aspect-w-1 relative"
        >
          {featuredImage ? (
            <NcImage
              containerClassName="absolute inset-0"
              src={featuredImage}
              fill
              alt={title}
            />
          ) : (
            <div className="absolute inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
              {post.categories[0]?.name}
            </div>
          )}
          <span>
            {/* <PostTypeFeaturedIcon
              className="absolute left-2 bottom-2"
              postType={postType}
              wrapSize="w-8 h-8"
              iconSize="w-4 h-4"
            /> */}
          </span>
        </Link>
      </div>
    </div>
  )
}
