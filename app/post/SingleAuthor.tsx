import React from "react"
import Link from "next/link"
import { User } from "@prisma/client"

import Avatar from "@/components/Avatar/Avatar"

export function SingleAuthor({ author }: { author: User }) {
  const { name, avatar, bio } = author
  const href = `/creator/${name}`

  return (
    <div className="flex nc-SingleAuthor">
      <Link href={href}>
        <Avatar
          imgUrl={avatar || "/img/default-avatar.png"}
          userName={name || "Anonymous"}
          sizeClass="h-12 w-12 text-lg sm:text-xl sm:h-24 sm:w-24"
        />
      </Link>
      <div className="flex flex-col max-w-lg ml-3 sm:ml-5">
        <span className="text-xs tracking-wider uppercase text-neutral-400">
          WRITTEN BY
        </span>
        <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
          <Link href={href}>{name}</Link>
        </h2>
        <span className="block mt-1 text-sm text-neutral-500 sm:text-base dark:text-neutral-300">
          {bio || "No bio available."}
        </span>
        <Link className="mt-2 font-medium text-primary-6000" href={href}>
          Visit Author Page
        </Link>
      </div>
    </div>
  )
}

export default SingleAuthor
