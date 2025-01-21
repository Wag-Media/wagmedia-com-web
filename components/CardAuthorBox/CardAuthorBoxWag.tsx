import React, { FC } from "react"
import Link from "next/link"
import { UserWithPosts } from "@/data/types"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

import Avatar from "@/components/Avatar/Avatar"

export interface CardAuthorBoxProps {
  className?: string
  author: UserWithPosts
}

const CardAuthorBoxWag: FC<CardAuthorBoxProps> = ({
  className = "",
  author,
}) => {
  const { name, avatar, totalEarnings, postCount } = author

  return (
    <Link
      href={`/creator/${name}`}
      className={`nc-CardAuthorBox flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 rounded-sm bg-gray-50 hover:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 ${className}`}
    >
      <Avatar
        sizeClass="w-20 h-20 text-2xl"
        radius="rounded-full"
        imgUrl={avatar || "/img/default-avatar.png"}
        userName={name || "Anonymous"}
      />
      <div className="mt-3">
        <h2 className={`text-sm sm:text-base font-medium`}>
          <span className="line-clamp-1">{name}</span>
        </h2>
        <span
          className={`block mt-1 text-sm text-neutral-500 dark:text-neutral-400`}
        ></span>
      </div>
      <div className="flex items-center justify-center px-4 py-2 mt-4 text-xs font-medium leading-none rounded-full bg-neutral-100 dark:bg-neutral-800">
        {totalEarnings.toFixed(2)} DOT earned
      </div>
      <div className="flex items-center justify-center px-4 py-2 mt-4 text-xs font-medium leading-none rounded-full bg-neutral-100 dark:bg-neutral-800">
        {postCount} Posts
        <ArrowRightIcon className="w-5 h-5 text-yellow-600 ms-3" />
      </div>
    </Link>
  )
}

export default CardAuthorBoxWag
