import React, { FC } from "react"
import Link from "next/link"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"

import Avatar from "@/components/Avatar/Avatar"

export interface PostCardWagProps {
  className?: string
  meta: Pick<PostWithTagsCategoriesReactionsPaymentsUser, "user" | "createdAt">
  hiddenAvatar?: boolean
  avatarSize?: string
}

const PostCardWagMeta: FC<PostCardWagProps> = ({
  className = "text-xs leading-none",
  meta,
  hiddenAvatar = false,
  avatarSize = "h-7 w-7 text-sm",
}) => {
  const { user, createdAt } = meta

  return (
    <div
      className={`nc-PostCardWag inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${className}`}
    >
      {user && (
        <Link
          href={`/creator/${user.name}`}
          className="relative flex items-center space-x-2 rtl:space-x-reverse"
        >
          {!hiddenAvatar && user.avatar && user.name && (
            <Avatar
              radius="rounded-full"
              sizeClass={avatarSize}
              imgUrl={user.avatar}
              userName={user.name}
            />
          )}
          <span className="block font-medium text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white">
            {user.name}
          </span>
        </Link>
      )}
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          ·
        </span>
        <span className="font-normal text-neutral-500 dark:text-neutral-400">
          {createdAt.toLocaleString("default", { month: "long" })}{" "}
          {createdAt.getDate()}, {createdAt.getFullYear()}
        </span>
      </>
    </div>
  )
}

export default PostCardWagMeta
