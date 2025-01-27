import React, { FC } from "react"
import Link from "next/link"
import { PostDataType } from "@/data/types"
import { Category, User } from "@prisma/client"

import { slugify } from "@/lib/slug"
import Avatar from "@/components/Avatar/Avatar"

export function UserInfo({
  author,
  description,
  title,
  link,
}: {
  author: {
    name: string | null
    avatar: string | null
  }
  description?: React.ReactNode
  title?: string
  link?: string | null
}) {
  return (
    <div
      className={`flex items-center text-xs flex-wrap text-neutral-700 text-left dark:text-neutral-200`}
    >
      <Link
        href={link || `/creator/${author.name}`}
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <Avatar
          imgUrl={author.avatar || "/img/default-avatar.png"}
          userName={author.name || "Anonymous"}
          sizeClass="h-11 w-11 text-sm"
        />
      </Link>
      <div className="ms-3">
        <div className="flex items-center">
          <Link
            href={link || `/creator/${author.name}`}
            className="block text-sm font-semibold"
          >
            {title ?? author.name}
          </Link>
        </div>
        {description && (
          <div className="text-xs mt-[6px]">
            <span className="text-neutral-700 dark:text-neutral-300">
              {description}
            </span>
          </div>
        )}
      </div>
    </div>
  )
}
