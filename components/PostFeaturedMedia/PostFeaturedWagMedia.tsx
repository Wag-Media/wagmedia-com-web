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
    categories: Category[]
    reactions: Reaction[]
    earnings: ContentEarnings[]
    slug: string
    embeds: Embed[]
  }
}

const PostFeaturedWagMedia: FC<PostFeaturedWagMediaProps> = ({
  className = "w-full h-full",
  post,
}) => {
  const { title, categories, reactions, embeds } = post

  const firstEmbed = embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage

  const getColorClass = (hasHover = true) => {
    switch (categories?.[0]?.name) {
      case "OpenGov":
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800/50" : ""
        }`
      case "DeFi":
        return `text-red-800 bg-red-100/50 ${
          hasHover ? "hover:bg-red-800/50" : ""
        }`
      case "NFT":
        return `text-gray-800 bg-gray-100/50 ${
          hasHover ? "hover:bg-gray-800/50" : ""
        }`
      case "Parachain":
        return `text-green-800 bg-green-100/50 ${
          hasHover ? "hover:bg-green-800/50" : ""
        }`
      case "Paraverse":
        return `text-purple-800 bg-purple-100/50 ${
          hasHover ? "hover:bg-purple-800/50" : ""
        }`
      case "Newsletter":
        return `text-indigo-800 bg-indigo-100/50 ${
          hasHover ? "hover:bg-indigo-800/50" : ""
        }`
      case "Non Anglo":
      case "Translations":
        return `text-yellow-800 bg-yellow-100/50 ${
          hasHover ? "hover:bg-yellow-800/50" : ""
        }`
      case "Technical Analysis":
        return `text-blue-800 bg-blue-100/50 ${
          hasHover ? "hover:bg-blue-800/50" : ""
        }`
      case "Bounty":
        return `text-orange-800 bg-orange-100/50 ${
          hasHover ? "hover:bg-orange-800/50" : ""
        }`
      case "Tutorials":
        return `text-teal-800 bg-teal-100/50 ${
          hasHover ? "hover:bg-teal-800/50" : ""
        }`
      case "Video":
        return `text-lime-800 bg-lime-100/50 ${
          hasHover ? "hover:bg-lime-800/50" : ""
        }`
      case "Wallet":
        return `text-blue-800 bg-blue-100/50 ${
          hasHover ? "hover:bg-blue-800/50" : ""
        }`
      case "RWA":
        return `text-purple-800 bg-purple-100/50 ${
          hasHover ? "hover:bg-purple-800/50" : ""
        }`
      default:
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800" : ""
        }`
    }
  }

  return (
    <div className={`nc-PostFeaturedMedia group relative ${className}`}>
      {featuredImage ? (
        <div
          className={`bg-cover bg-center w-full h-full`}
          style={{
            backgroundImage: `url(${featuredImage})`,
          }}
        >
          {featuredImage.includes("discordapp") ? (
            <Image
              alt={title}
              fill
              className="object-contain backdrop-blur-lg"
              src={featuredImage}
              sizes="(max-width: 600px) 480px, 800px"
            />
          ) : (
            <div>
              {/* @ts-ignore */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImage}
                alt={title}
                className="absolute object-contain w-full h-full backdrop-blur-lg"
                sizes="(max-width: 600px) 480px, 800px"
              />
            </div>
          )}
        </div>
      ) : (
        <div
          className={`absolute text-3xl inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center ${getColorClass()}`}
        >
          <span className={`pr-2`}>✦</span>
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
