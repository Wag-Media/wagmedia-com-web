"use client"

import React, { FC, useState } from "react"
import Link from "next/link"
import { ReactionWithUserAndEmoji } from "@/data/types"
import { Category, ContentEarnings, Embed, User } from "@prisma/client"

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
    user?: Pick<User, "avatar" | "name">
    createdAt: Date
    content: string
  }
  ratio?: string
  hiddenAuthor?: boolean
  showReactions?: boolean
}

export default function Card11Wag({
  className = "",
  post,
  ratio = "aspect-w-16 aspect-h-9",
  showReactions = true,
}: Card11Props) {
  const { categories, reactions, earnings } = post

  return (
    <div
      className={`nc-Card11 shadow-sm border-[1.5px] relative flex flex-col group rounded-sm overflow-hidden ${className} hover:shadow-lg transition-all duration-300 hover:border-pink-500`}
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
          <PostCardWagMeta user={post.user} createdAt={post.createdAt} />
          <h3 className="mb-2 leading-tight text-gray-900 dark:text-white text-normal font-unbounded">
            {post.title}
          </h3>
          {post?.content && (
            <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {removeLinks(removeHtmlTags(post.content))}
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
            showReactions={showReactions}
          />
        </div>
      </div>
    </div>
  )
}
