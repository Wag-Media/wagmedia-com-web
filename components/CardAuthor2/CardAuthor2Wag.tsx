import React, { FC } from "react"
import Link from "next/link"
import { PostDataType } from "@/data/types"
import { User } from "@prisma/client"

import Avatar from "@/components/Avatar/Avatar"

export interface CardAuthor2WagProps {
  author: User
  date: Date
  className?: string
  readingTime?: PostDataType["readingTime"]
  hoverReadingTime?: boolean
}

const CardAuthor2Wag: FC<CardAuthor2WagProps> = ({
  className = "",
  author,
  readingTime,
  date,
  hoverReadingTime = true,
}) => {
  const { name, avatar } = author
  return (
    <Link
      href={`/creator/${name}`}
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 me-3"
        radius="rounded-full"
        imgUrl={avatar || "/img/default-avatar.png"}
        userName={name || "Anonymous"}
      />
      <div>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
        >
          {name}
        </h2>
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          <span>{date.toDateString()}</span>
          {readingTime && (
            <>
              <span
                className={`hidden lg:inline mx-1 transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                ·
              </span>
              <span
                className={`hidden lg:inline transition-opacity ${
                  hoverReadingTime ? "opacity-0 group-hover:opacity-100" : ""
                }`}
              >
                {readingTime} min read
              </span>
            </>
          )}
        </span>
      </div>
    </Link>
  )
}

export default CardAuthor2Wag
