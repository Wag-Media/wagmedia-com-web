import React from "react"
import Link from "next/link"
import { UserWithPosts } from "@/data/types"
import { User } from "@prisma/client"

import Avatar from "@/components/Avatar/Avatar"

export function SingleAuthor({ author }: { author: User }) {
  const { name, avatar, bio } = author
  const href = `/author/${name}`

  return (
    <div className="nc-SingleAuthor flex">
      <Link href={href}>
        <Avatar
          imgUrl={avatar || "/img/default-avatar.png"}
          userName={name || "Anonymous"}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
        />
      </Link>
      <div className="flex flex-col ml-3 max-w-lg sm:ml-5">
        <span className="text-xs text-neutral-400 uppercase tracking-wider">
          WRITTEN BY
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link href={href}>{name}</Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {bio || "No bio available."}
        </span>
        <Link className="text-primary-6000 font-medium mt-2" href={href}>
          Visit Author Page
        </Link>
      </div>
    </div>
  )
}

export default SingleAuthor
