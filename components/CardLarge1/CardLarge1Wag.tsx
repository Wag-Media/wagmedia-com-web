import React, { FC } from "react"
import Link from "next/link"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import NextPrev from "@/components/NextPrev/NextPrev"

import { cn } from "../../lib/utils"
import CardAuthor2Wag from "../CardAuthor2/CardAuthor2Wag"
import CategoryBadgeListWag from "../CategoryBadgeList/CategoryBadgeListWag"
import { WagImage } from "../WagImage/WagImage"

export interface CardLarge1WagProps {
  className?: string
  post: PostWithTagsCategoriesReactionsPaymentsUser
  onClickNext?: () => void
  onClickPrev?: () => void
}

const CardLarge1Wag: FC<CardLarge1WagProps> = ({
  className = "",
  post,
  onClickNext = () => {},
  onClickPrev = () => {},
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

  const firstEmbed = embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage ?? "/image404.png"

  return (
    <div
      className={`nc-CardLarge1 nc-CardLarge1--hasAnimation relative flex flex-col-reverse md:flex-row justify-end ${className}`}
    >
      <div className="z-10 w-full px-3 -mt-8 md:absolute md:start-0 md:top-1/2 md:-translate-y-1/2 md:mt-0 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <div className="p-4 space-y-3 rounded-lg shadow-lg nc-CardLarge1__left sm:p-8 xl:py-14 md:px-10 bg-white/40 dark:bg-neutral-900/40 backdrop-filter backdrop-blur-lg dark:shadow-2xl sm:space-y-5 ">
          <CategoryBadgeListWag categories={categories} />

          <h2 className="text-base font-semibold nc-card-title sm:text-xl lg:text-2xl ">
            <Link
              href={`/post/${post.slug}`}
              className="line-clamp-2"
              title={title}
            >
              {title}
            </Link>
          </h2>

          <CardAuthor2Wag className="relative" author={user} date={createdAt} />

          {/* <div className="flex items-center justify-between mt-auto">
            <PostCardLikeAndComment />
            <PostCardSaveAction bookmarkClass="h-8 w-8 bg-neutral-50/30 hover:bg-neutral-50/50 dark:bg-neutral-800/30 dark:hover:bg-neutral-800/50" />
          </div> */}
        </div>
        <div className="p-4 sm:pt-8 sm:px-10">
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </div>
      </div>
      <div className="w-full md:w-4/5 lg:w-2/3">
        <Link
          href={`/post/${post.slug}`}
          className="relative block nc-CardLarge1__right"
        >
          {/* <NcImage
            containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
            className="absolute inset-0 object-cover rounded-lg"
            src={featuredImage}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          /> */}

          <WagImage
            image={featuredImage}
            containerClassName={cn(
              "aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative rounded-lg"
            )}
            containerStyle={{ backgroundImage: `url(${featuredImage})` }}
            className="inset-0 object-contain rounded-lg backdrop-blur-lg"
            priority={true}
            alt={title}
          />
          {/* META TYPE */}
          {/* <PostTypeFeaturedIcon
            postType={post.postType}
            className="absolute w-8 h-8 md:w-10 md:h-10 right-6 top-6"
          /> */}
        </Link>
      </div>
    </div>
  )
}

export default CardLarge1Wag
