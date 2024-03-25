import React, { FC } from "react"
import { ContentEarnings } from "@prisma/client"
import { Coins, Smile } from "lucide-react"

import PostCardCommentBtn from "@/components/PostCardCommentBtn/PostCardCommentBtn"
import PostCardLikeAction from "@/components/PostCardLikeAction/PostCardLikeAction"

import { totalEarnings } from "../../utils/totalPostEarnings"
import PostCardLikeActionWag from "../PostCardLikeAction/PostCardLikeActionWag"

export interface PostCardLikeAndCommentWagProps {
  className?: string
  itemClass?: string
  hiddenCommentOnMobile?: boolean
  useOnSinglePage?: boolean
  likeCount?: number
  earnings?: ContentEarnings[]
}

const PostCardLikeAndCommentWag: FC<PostCardLikeAndCommentWagProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  likeCount = 0,
  earnings = [],
}) => {
  let total = totalEarnings(earnings)

  return (
    <div className="flex items-center space-x-2 w-full justify-between">
      <div
        className={`cursor-default flex gap-2 px-3 h-8 text-xs relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 ${itemClass}`}
      >
        <Smile size={20} strokeWidth={2} />
        {likeCount}
      </div>
      {total && parseFloat(total) > 0 && (
        <div
          className={`cursor-default flex gap-2 px-3 h-8 text-xs relative items-center min-w-[68px] rounded-full text-neutral-6000 bg-neutral-50 transition-colors dark:text-neutral-200 dark:bg-neutral-800 hover:bg-teal-50 dark:hover:bg-teal-100 hover:text-teal-600 dark:hover:text-teal-500 ${itemClass}`}
        >
          <Coins strokeWidth={2} />
          {total}
        </div>
      )}
    </div>
  )
}

export default PostCardLikeAndCommentWag
