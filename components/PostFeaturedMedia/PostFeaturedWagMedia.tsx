"use client"

import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"
import { categoryToColor, stringToColor } from "@/utils/stringToColor"
import { Category, ContentEarnings, Embed, Reaction } from "@prisma/client"

import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon"

import GallerySlider from "./GallerySlider"
import MediaAudio from "./MediaAudio"
import MediaVideo from "./MediaVideo"

export interface PostFeaturedWagMediaProps {
  className?: string
  post: {
    title: string
    categories?: Category[]
    reactions?: Reaction[]
    earnings?: ContentEarnings[]
    slug: string
    embeds?: Embed[]
  }
}

const PostFeaturedWagMedia: FC<PostFeaturedWagMediaProps> = ({
  className = "w-full h-full",
  post,
}) => {
  const { title, categories, reactions, embeds } = post

  const firstEmbed = embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage

  return (
    <div className={`nc-PostFeaturedMedia group relative ${className}`}>
      {featuredImage ? (
        <div
          className={`bg-cover bg-center w-full h-full rounded-t-2xl`}
          style={{
            backgroundImage: `url(${featuredImage})`,
          }}
        >
          {featuredImage.includes("discordapp") ? (
            <Image
              alt={title}
              fill
              className="object-contain backdrop-blur-lg rounded-t-2xl"
              src={featuredImage}
              sizes="(max-width: 600px) 480px, 800px"
            />
          ) : (
            <div>
              {/* @ts-ignore */}

              <div className="absolute inset-0 rounded-t-2xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={featuredImage}
                  alt={title}
                  className="absolute object-contain w-full h-full backdrop-blur-lg "
                  sizes="(max-width: 600px) 480px, 800px"
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div
          className={`absolute text-2xl gap-2 inset-0 items-center justify-center text-gray-600 dark:text-gray-400 flex flex-col rounded-t-2xl`}
        >
          <Image
            src="/wagmedia-logo.png"
            alt="logo"
            width={100}
            height={100}
            className="rounded-t-2xl"
          />
          {post.categories?.[0]?.name}
        </div>
      )}
      {/* {renderContent()} */}
      {/* {postType !== "gallery" && ( */}
      <Link
        href={`/post/${post.slug}`}
        className={`block absolute inset-0 bg-purple-500/50 transition-opacity opacity-0`}
      />
      {/* )} */}
    </div>
  )
}

export default PostFeaturedWagMedia
