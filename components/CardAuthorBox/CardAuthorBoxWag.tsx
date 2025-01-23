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
      className={`nc-CardAuthorBox flex flex-col items-center justify-center text-center px-3 py-5 sm:px-6 sm:py-7 rounded-sm shadow-sm hover:shadow-lg border-[1.5px] transition-all duration-300 hover:border-[var(--polkadot-pink)] transition-all ${className}`}
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
      <div className="flex items-center justify-center px-4 py-2 text-xs font-medium leading-none ">
        {totalEarnings.toFixed(2)} DOT earned
      </div>
      <div className="flex items-center justify-center px-4 py-2 text-xs font-medium leading-none ">
        {postCount} Posts
      </div>
    </Link>
  )
}

export default CardAuthorBoxWag
