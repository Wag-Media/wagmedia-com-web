"use client"

import React, { useEffect, useState } from "react"
import Image from "next/image"
import { User } from "@prisma/client"

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-indigo-500",
]

interface Avatar {
  id: number
  x: number
  y: number
  avatar: string | null
  name: string | null
  color: string
}

export function HeroBackground({
  authorAvatars = [],
}: {
  authorAvatars: Pick<User, "avatar" | "name">[]
}) {
  const avatarDimension = 45

  const [avatarData, setAvatarData] = useState<Avatar[]>([])
  const [visibleIds, setVisibleIds] = useState<number[]>([])

  useEffect(() => {
    if (authorAvatars.length === 0) return

    const padding = avatarDimension + 30
    const safePercentageX = (padding / window.innerWidth) * 100
    const safePercentageY = (padding / window.innerHeight) * 100

    const centerSafeZoneStart = 25
    const centerSafeZoneEnd = 75

    const generatePosition = () => {
      let x, y
      do {
        x = safePercentageX + Math.random() * (100 - 2 * safePercentageX)
        y = safePercentageY + Math.random() * (100 - 2 * safePercentageY)
      } while (
        x > centerSafeZoneStart &&
        x < centerSafeZoneEnd &&
        y > centerSafeZoneStart &&
        y < centerSafeZoneEnd
      )
      return { x, y }
    }

    const initialAvatars = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: generatePosition().x,
      y: generatePosition().y,
      avatar: authorAvatars[i].avatar,
      name: authorAvatars[i].name,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))

    setAvatarData(initialAvatars)

    let currentIndex = 0
    const maxAvatars = initialAvatars.length

    const interval = setInterval(() => {
      if (currentIndex >= maxAvatars) {
        clearInterval(interval)
        return
      }

      setVisibleIds((prev) => [...prev, currentIndex])
      currentIndex++
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="absolute inset-0 z-0">
      {avatarData?.map((avatar) => (
        <div
          key={avatar.id}
          className={`absolute w-[${avatarDimension}px] h-[${avatarDimension}px] animate-avatar ${
            visibleIds.includes(avatar.id) ? "opacity-80" : "opacity-0"
          }`}
          style={{
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
            animationDelay: `${avatar.id * 313}ms`,
            transitionProperty: "all",
            transitionDuration: "1000ms",
          }}
        >
          <div
            className={`absolute inset-[2px] ${avatar.color} rounded-full animate-ping-slow opacity-50 dark:opacity-100`}
          ></div>
          <Image
            width={avatarDimension}
            height={avatarDimension}
            src={avatar.avatar || "/placeholder.svg"}
            alt={`${avatar.name} Avatar`}
            className={`relative z-10 object-cover w-[${avatarDimension}px] h-[${avatarDimension}px] rounded-full text-[0px]`}
            priority
          />
        </div>
      ))}
    </div>
  )
}
