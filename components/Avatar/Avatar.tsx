"use client"

import React from "react"
import Image, { StaticImageData } from "next/image"

export interface AvatarProps {
  containerClassName?: string
  sizeClass?: string
  radius?: string
  imgUrl?: string | StaticImageData
  userName?: string
}

export function Avatar({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl, // Add type annotation here
  userName,
}: AvatarProps) {
  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
    >
      {imgUrl && (
        <Image
          fill
          sizes="100px"
          className="absolute inset-0 w-full h-full object-cover !mt-0 mb-0"
          src={imgUrl}
          alt={userName || "User avatar"}
        />
      )}
    </div>
  )
}

export default Avatar
