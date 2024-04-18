import React, { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { TagWithCount, TaxonomyType, TwMainColor } from "@/data/types"
import { TagIcon } from "@heroicons/react/24/outline"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Badge from "@/components/Badge/Badge"

export interface CardCategory5WagProps {
  className?: string
  tag: TagWithCount
}

const CardCategory5Wag: FC<CardCategory5WagProps> = ({
  className = "",
  tag,
}) => {
  const { _count, name } = tag
  const postCount = _count?.posts
  const href = `/tag/${tag.name}`
  const size = "large"

  return (
    <Link
      href={href}
      className={`nc-CardCategory5Wag relative block group p-4 border border-slate-300 rounded-lg items-center text-center ${className}`}
    >
      <TagIcon width={40} height={40} className="mr-2" />
      <div>
        <h2
          className={`${
            size === "large" ? "text-lg" : "text-base"
          } nc-card-title text-neutral-900 dark:text-neutral-100 text-sm sm:text-base font-medium sm:font-semibold`}
        >
          #{name}
        </h2>
        <span
          className={`${
            size === "large" ? "text-sm" : "text-xs"
          } block mt-[2px] text-neutral-500 dark:text-neutral-400`}
        >
          {_count.posts} Articles
        </span>
      </div>
    </Link>
  )
}

export default CardCategory5Wag
