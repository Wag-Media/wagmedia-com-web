"use client"

import React, { FC, useEffect, useState } from "react"
import Image, { StaticImageData } from "next/image"
import { avatarColors } from "@/contains/contants"
import { _getAvatarRd } from "@/contains/fakeData"

export interface AvatarProps {
  containerClassName?: string
  sizeClass?: string
  radius?: string
  imgUrl?: string | StaticImageData
  userName?: string
}

const _setBgColor = (name: string) => {
  const backgroundIndex = Math.floor(name.charCodeAt(0) % avatarColors.length)
  return avatarColors[backgroundIndex]
}

const Avatar: FC<AvatarProps> = ({
  containerClassName = "ring-1 ring-white dark:ring-neutral-900",
  sizeClass = "h-6 w-6 text-sm",
  radius = "rounded-full",
  imgUrl,
  userName,
}) => {
  const [url, setUrl] = useState(imgUrl)

  useEffect(() => {
    // FOR DEMO
    if (!url) {
      setUrl(_getAvatarRd())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      className={`wil-avatar relative flex-shrink-0 inline-flex items-center justify-center overflow-hidden text-neutral-100 uppercase font-semibold shadow-inner ${radius} ${sizeClass} ${containerClassName}`}
      style={{ backgroundColor: url ? undefined : _setBgColor(userName) }}
    >
      {url && (
        <Image
          fill
          sizes="100px"
          className="absolute inset-0 w-full h-full object-cover !mt-0 mb-0"
          src={url}
          alt={userName}
        />
      )}
    </div>
  )
}

export default Avatar
