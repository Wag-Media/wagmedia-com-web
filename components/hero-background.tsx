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
  speedMultiplier: number
}

const PRESET_POSITIONS = [
  { x: 5, y: 15 },
  { x: 75, y: 85 },
  { x: 12, y: 85 },
  { x: 88, y: 82 },
  { x: 8, y: 45 },
  { x: 92, y: 55 },
  { x: 15, y: 5 },
  { x: 82, y: 8 },
  { x: 18, y: 92 },
  { x: 85, y: 95 },
  { x: 5, y: 75 },
  { x: 89, y: 25 },
  { x: 25, y: 55 },
  { x: 79, y: 34 },
  { x: 22, y: 75 },
  { x: 78, y: 72 },
  { x: 35, y: 8 },
  { x: 65, y: 5 },
  { x: 32, y: 92 },
  { x: 68, y: 95 },
]

export function HeroBackground({
  authorAvatars = [],
}: {
  authorAvatars: Pick<User, "avatar" | "name">[]
}) {
  const avatarDimension = 45
  const [avatarData, setAvatarData] = useState<Avatar[]>([])
  const [visibleIds, setVisibleIds] = useState<number[]>([])
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (authorAvatars.length === 0) return

    const initialAvatars = PRESET_POSITIONS.map((position, i) => ({
      id: i,
      x: position.x,
      y: position.y,
      avatar: authorAvatars[i]?.avatar ?? null,
      name: authorAvatars[i]?.name ?? null,
      color: colors[Math.floor(Math.random() * colors.length)],
      speedMultiplier: 0.0 + Math.random() * 0.2,
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
    }, 500)

    return () => clearInterval(interval)
  }, [authorAvatars])

  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        transform: `translateY(${scrollY * 0.2}px)`,
        transition: "transform 0.1s ease-out",
      }}
    >
      {avatarData?.map((avatar) => (
        <div
          key={avatar.id}
          className={`absolute animate-avatar ${
            visibleIds.includes(avatar.id) ? "opacity-100" : "opacity-0"
          }`}
          style={{
            width: `${avatarDimension}px`,
            height: `${avatarDimension}px`,
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
            animationDelay: `${avatar.id * 313}ms`,
            transitionProperty: "all",
            transitionDuration: "1000ms",
          }}
        >
          <div
            style={{
              width: `${avatarDimension}px`,
              height: `${avatarDimension}px`,
              transform: `translateY(${scrollY * avatar.speedMultiplier}px)`,
              transition: "transform 0.1s ease-out",
              opacity: 0,
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
              onLoad={(e) => {
                const parent = e.currentTarget.parentElement
                if (parent) {
                  parent.style.opacity = "1"
                }
              }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}
