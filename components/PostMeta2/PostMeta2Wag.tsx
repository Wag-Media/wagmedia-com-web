import React, { FC } from "react"
import Link from "next/link"
import { DEMO_POSTS } from "@/data/posts"
import { CategoryWithCount, PostDataType } from "@/data/types"
import { Category, User } from "@prisma/client"

import { slugify } from "@/lib/slug"
import Avatar from "@/components/Avatar/Avatar"

const metaDemo: PostMeta2WagProps["meta"] = DEMO_POSTS[0]

export interface PostMeta2WagProps {
  className?: string
  meta?: Pick<PostDataType, "date" | "author" | "categories" | "readingTime">
  hiddenCategories?: boolean
  size?: "large" | "normal"
  avatarRounded?: string
  author: User
  date: Date
  categories: Category[]
}

const PostMeta2Wag: FC<PostMeta2WagProps> = ({
  className = "leading-none",
  meta = metaDemo,
  hiddenCategories = false,
  size = "normal",
  avatarRounded,
  author,
  date,
  categories,
}) => {
  return (
    <div
      className={`nc-PostMeta2Wag flex items-center flex-wrap text-neutral-700 text-left dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-sm"
      } ${className}`}
    >
      <Link
        href={`/creator/${author.name}`}
        className="flex items-center space-x-2 rtl:space-x-reverse"
      >
        <Avatar
          radius={avatarRounded}
          sizeClass={
            size === "normal"
              ? "h-6 w-6 text-sm"
              : "h-10 w-10 sm:h-11 sm:w-11 text-xl"
          }
          imgUrl={author.avatar || "/img/default-avatar.png"}
          userName={author.name || "Anonymous"}
        />
      </Link>
      <div className="ms-3">
        <div className="flex items-center">
          <Link
            href={`/creator/${author.name}`}
            className="block font-semibold"
          >
            {author.name}
          </Link>

          {!hiddenCategories && (
            <>
              <span className="mx-2 font-semibold">·</span>
              <div className="ms-0">
                <span className="text-xs">🏷 </span>
                {categories.map((cat, index) => (
                  <Link
                    key={cat.id}
                    href={`/category/${slugify(cat.name)}`}
                    className="font-semibold"
                  >
                    {cat.name}
                    {index < categories.length - 1 && <span>, </span>}
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
        <div className="text-xs mt-[6px]">
          <span className="text-neutral-700 dark:text-neutral-300">
            {date.toDateString()}
          </span>
        </div>
      </div>
    </div>
  )
}

export default PostMeta2Wag
