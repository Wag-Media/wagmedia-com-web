"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { User } from "@prisma/client"

const avatars = [
  "/placeholder.svg?height=40&width=40",
  "/placeholder.svg?height=40&width=40",
  "/placeholder.svg?height=40&width=40",
  "/placeholder.svg?height=40&width=40",
  "/placeholder.svg?height=40&width=40",
  // Add more placeholder avatars or actual Discord-like avatar URLs to have at least 20 unique avatars
]

const colors = [
  "bg-red-400",
  "bg-blue-400",
  "bg-green-400",
  "bg-yellow-400",
  "bg-purple-400",
  "bg-pink-400",
  "bg-indigo-400",
]

interface Avatar {
  id: number
  x: number
  y: number
  avatar: string | undefined
  color: string
  name: string | null | undefined
  className: string
}

const initialAvatars = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  avatar: undefined,
  color: colors[i % colors.length],
  name: undefined,
  className: "opacity-0",
}))

export function HeroBackground({ users }: { users: User[] }) {
  const [avatarData, setAvatarData] = useState<Avatar[]>(initialAvatars)
  const avatarRefs = useRef<(HTMLImageElement | null)[]>([])

  useEffect(() => {
    avatarRefs.current = avatarRefs.current.slice(0, avatarData.length)
  }, [avatarData.length])

  useEffect(() => {
    console.log("initialAvatars", initialAvatars)

    let currentAvatar = 0

    const interval = setInterval(() => {
      setAvatarData((prevAvatars) => {
        const newAvatars = [...prevAvatars]

        const avatarToUpdate = newAvatars[currentAvatar]

        avatarToUpdate.name = users[currentAvatar].name
        avatarToUpdate.avatar = users[currentAvatar].avatar?.replace(
          "w=96",
          "w=64"
        )

        const imageRef = avatarRefs.current[currentAvatar]
        if (imageRef) {
          imageRef.src = avatarToUpdate.avatar || "/placeholder.svg"
          imageRef.className = "opacity-100"
        }

        currentAvatar = (currentAvatar + 1) % newAvatars.length

        return newAvatars
      })
    }, 1359) // Add/remove avatar every 2 seconds

    return () => clearInterval(interval)
  }, [users])

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      {avatarData.map((avatar, index) => (
        <div
          key={avatar.id}
          className={`absolute w-[64px] h-[64px] transition-opacity duration-5000 animate-up-down ${avatar.className}`}
          style={{
            left: `${avatar.x}%`,
            top: `${avatar.y}%`,
            animationDelay: `${avatar.id * 0.18}s`,
            animationDuration: `${7 + avatar.id * 0.18}s`,
          }}
        >
          <div
            className={`absolute inset-[2px] ${avatar.color} rounded-full animate-ping-pulse opacity-100 duration-5000`}
          ></div>
          <Image
            src={avatar.avatar || "/placeholder.svg"}
            alt={avatar.name || "User Avatar"}
            className="relative z-10 object-cover w-[64px] h-[64px] rounded-full"
            width={64}
            height={64}
          />
        </div>
      ))}
    </div>
  )
}
