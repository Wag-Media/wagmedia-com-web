"use client"

import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"
import { categoryToColor, stringToColor } from "@/utils/stringToColor"

import PostTypeFeaturedIcon from "@/components/PostTypeFeaturedIcon/PostTypeFeaturedIcon"

import GallerySlider from "./GallerySlider"
import MediaAudio from "./MediaAudio"
import MediaVideo from "./MediaVideo"

export interface PostFeaturedWagMediaProps {
  className?: string
  post: PostWithTagsCategoriesReactionsPaymentsUser
  isHover?: boolean
}

const PostFeaturedWagMedia: FC<PostFeaturedWagMediaProps> = ({
  className = "w-full h-full",
  post,
  isHover = false,
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
  } = post

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
  //         className="hover:scale-105 transform cursor-pointer transition-transform"
  //         postType={postType}
  //       />
  //     </span>
  //   ) : null;
  // };

  const catColor = categoryToColor(categories[0]?.name)

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
                className="object-contain backdrop-blur-lg absolute w-full h-full "
                sizes="(max-width: 600px) 480px, 800px"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="absolute text-3xl inset-0 bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center">
          <span className={`pr-2 ${catColor}`}>✦</span>
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
