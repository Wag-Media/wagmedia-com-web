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
  isHover?: boolean
}

const PostFeaturedWagMedia: FC<PostFeaturedWagMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
}) => {
  const { title, categories, reactions, embeds } = post

  const isPostMedia = () => embeds && embeds.length > 0
  const firstEmbed = embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage

  // const renderGallerySlider = () => {
  //   if (!galleryImgs) return null;
  //   return (
  //     <GallerySlider
  //       href={href}
  //       galleryImgs={galleryImgs}
  //       className="absolute inset-0 z-10"
  //       galleryClass="absolute inset-0"
  //       ratioClass="absolute inset-0"
  //     />
  //   );
  // };

  // const renderContent = () => {
  //   // GALLERY
  //   if (postType === "gallery") {
  //     return renderGallerySlider();
  //   }

  //   // VIDEO
  //   if (postType === "video" && !!videoUrl && isHover) {
  //     return <MediaVideo isHover videoUrl={videoUrl} />;
  //   }

  //   // AUDIO
  //   if (postType === "audio" && !!audioUrl) {
  //     return <MediaAudio post={post} />;
  //   }

  //   // ICON
  //   return isPostMedia() ? (
  //     <span className="absolute inset-0 flex items-center justify-center ">
  //       <PostTypeFeaturedIcon
  //         className="transition-transform transform cursor-pointer hover:scale-105"
  //         postType={postType}
  //       />
  //     </span>
  //   ) : null;
  // };

  const getColorClass = (hasHover = true) => {
    switch (categories[0].name) {
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
      default:
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800" : ""
        }`
    }
  }

  return (
    <div className={`nc-PostFeaturedMedia relative ${className}`}>
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
              className="object-contain backdrop-blur-lg "
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
                className="absolute object-contain w-full h-full backdrop-blur-lg "
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
          {post.categories[0]?.name}
        </div>
      )}
      {/* {renderContent()} */}
      {/* {postType !== "gallery" && ( */}
      <Link
        href={`/post/${post.slug}`}
        className={`block absolute inset-0 bg-black/20 transition-opacity opacity-0 group-hover:opacity-100`}
      />
      {/* )} */}
    </div>
  )
}

export default PostFeaturedWagMedia
