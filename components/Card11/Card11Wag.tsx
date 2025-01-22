"use client"

import React, { FC, useState } from "react"
import Link from "next/link"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
  ReactionWithUserAndEmoji,
} from "@/data/types"
import {
  Category,
  ContentEarnings,
  Embed,
  Reaction,
  User,
} from "@prisma/client"

import { removeHtmlTags, removeLinks } from "@/app/post/[slug]/util"

import CategoryBadgeListWag from "../CategoryBadgeList/CategoryBadgeListWag"
import PostCardLikeAndCommentWag from "../PostCardLikeAndComment/PostCardLikeAndCommentWag"
import PostCardWagMeta from "../PostCardMeta/PostCardWagMeta"
import PostFeaturedWagMedia from "../PostFeaturedMedia/PostFeaturedWagMedia"

export interface Card11Props {
  className?: string
  post: {
    title: string
    categories: Category[]
    reactions: ReactionWithUserAndEmoji[]
    earnings: ContentEarnings[]
    slug: string
    embeds: Embed[]
    user: User
    createdAt: Date
    content: string
  }
  ratio?: string
  hiddenAuthor?: boolean
}

const Card11Wag: FC<Card11Props> = ({
  className = "",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-16 aspect-h-9",
}) => {
  const { categories, reactions, earnings } = post

  return (
    <div
      className={`nc-Card11 shadow-sm border-2 relative flex flex-col group rounded-sm overflow-hidden bg-white dark:bg-neutral-900 ${className} hover:shadow-lg transition-all duration-300 hover:border-pink-500`}
    >
      <div
        className={`block flex-shrink-0 relative w-full overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedWagMedia post={post} className="h-[200px]" />
        </div>
      </div>

      <span className="absolute z-10 top-3 inset-x-3">
        <CategoryBadgeListWag categories={categories} />
      </span>

      <div className="flex flex-col h-full p-4 space-y-3">
        <div className="relative flex-1">
          <Link href={`/post/${post.slug}`} className="absolute inset-0"></Link>
          <PostCardWagMeta meta={{ ...post }} />

          <h3 className="mb-2 leading-tight text-gray-900 text-normal font-unbounded">
            {post.title}
          </h3>
          {post?.content && (
            <p className="text-sm text-gray-600 line-clamp-2">
              {removeLinks(removeHtmlTags(post.content)).slice(0, 200)}
              ...
            </p>
          )}
        </div>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndCommentWag
            className="relative"
            likeCount={reactions.length}
            earnings={earnings}
            reactions={reactions}
            withCounts={false}
          />
        </div>
      </div>
    </div>
  )
}

export default Card11Wag
