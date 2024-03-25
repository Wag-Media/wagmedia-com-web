"use client";

import React, { FC, useState } from "react";
import PostCardSaveAction from "@/components/PostCardSaveAction/PostCardSaveAction";
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types";
import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList";
import PostCardLikeAndComment from "@/components/PostCardLikeAndComment/PostCardLikeAndComment";
import PostCardMeta from "@/components/PostCardMeta/PostCardMeta";
import PostFeaturedMedia from "@/components/PostFeaturedMedia/PostFeaturedMedia";
import Link from "next/link";
import PostFeaturedWagMedia from "../PostFeaturedMedia/PostFeaturedWagMedia";
import PostCardWagMeta from "../PostCardMeta/PostCardWagMeta";
import PostCardLikeAndCommentWag from "../PostCardLikeAndComment/PostCardLikeAndCommentWag";
import CategoryBadgeListWag from "../CategoryBadgeList/CategoryBadgeListWag";

export interface Card11Props {
  className?: string;
  post: PostWithTagsCategoriesReactionsPaymentsUser;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11Wag: FC<Card11Props> = ({
  className = "h-full",
  post,
  hiddenAuthor = false,
  ratio = "aspect-w-16 aspect-h-9",
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
  } = post;

  const [isHover, setIsHover] = useState(false);

  return (
    <div
      className={`nc-Card11 shadow-sm border border-gray-100 dark:border-none relative flex flex-col group rounded-lg overflow-hidden bg-white dark:bg-neutral-900 ${className}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-lg overflow-hidden z-10 ${ratio}`}
      >
        <div>
          <PostFeaturedWagMedia post={post} isHover={isHover} />
        </div>
      </div>
      <Link href={`/post/${post.slug}`} className="absolute inset-0"></Link>
      <span className="absolute top-3 inset-x-3 z-10">
        <CategoryBadgeListWag categories={categories} />
      </span>

      <div className="p-4 flex flex-col space-y-3">
        <PostCardWagMeta meta={{ ...post }} />

        <h3 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <span className="line-clamp-2" title={title}>
            {title}
          </span>
        </h3>
        <div className="flex items-end justify-between mt-auto">
          <PostCardLikeAndCommentWag
            className="relative"
            likeCount={reactions.length}
            earnings={earnings}
          />
          {/* <PostCardSaveAction className="relative" /> */}
        </div>
      </div>
    </div>
  );
};

export default Card11Wag;
