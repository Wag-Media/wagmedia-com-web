import React, { FC, useMemo } from "react"
import Image from "next/image"
import { ReactionWithUserAndEmoji } from "@/data/types"
import { ContentEarnings } from "@prisma/client"
import { Coins, ThumbsUp } from "lucide-react"

import PostCardCommentBtn from "@/components/PostCardCommentBtn/PostCardCommentBtn"
import PostCardLikeAction from "@/components/PostCardLikeAction/PostCardLikeAction"

import { totalEarnings } from "../../utils/totalPostEarnings"
import PostCardLikeActionWag from "../PostCardLikeAction/PostCardLikeActionWag"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card"

export interface PostCardLikeAndCommentWagProps {
  className?: string
  itemClass?: string
  hiddenCommentOnMobile?: boolean
  useOnSinglePage?: boolean
  likeCount?: number
  reactions?: ReactionWithUserAndEmoji[]
  earnings?: ContentEarnings[]
}

interface GroupedReaction {
  emojiId: string
  count: number
  emojiUrl: string | null
  reactions: ReactionWithUserAndEmoji[]
}

const PostCardLikeAndCommentWag: FC<PostCardLikeAndCommentWagProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  useOnSinglePage = false,
  reactions = [],
  likeCount = 0,
  earnings = [],
}) => {
  let total = totalEarnings(earnings)

  const sliceAfter = 16

  // Utility function to group reactions by emojiId
  const groupedReactions = useMemo(() => {
    const reactionCount: Record<string, GroupedReaction> = {}

    reactions.forEach((reaction) => {
      if (reactionCount[reaction.emojiId]) {
        reactionCount[reaction.emojiId].count += 1
        reactionCount[reaction.emojiId].reactions.push(reaction)
      } else {
        reactionCount[reaction.emojiId] = {
          emojiId: reaction.emojiId,
          count: 1,
          emojiUrl: reaction.emoji.url || null,
          reactions: [reaction],
        }
      }
    })

    return Object.values(reactionCount)
  }, [reactions])

  return (
    <div className="flex items-center space-x-2 w-full justify-between">
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <div className="flex items-center gap-2 text-xs cursor-default rounded-full shadow-sm p-2 border">
            <ThumbsUp size={20} strokeWidth={1} />
            {likeCount}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <ul className="flex gap-4 flex-wrap">
            {groupedReactions.slice(0, sliceAfter).map((group) => (
              <li key={group.emojiId} className="inline-block">
                {group.emojiUrl ? (
                  <Image
                    src={group.emojiUrl}
                    alt={group.emojiId}
                    width={20}
                    height={20}
                    className="inline-block m-0 p-0 mr-1"
                  />
                ) : (
                  <span className="align-middle text-[20px] mr-1">
                    {group.emojiId}
                  </span>
                )}
                <span className="text-sm text-gray-500">x{group.count}</span>
              </li>
            ))}
            {groupedReactions.length > sliceAfter && (
              <li className="inline-block">
                <span className="text-sm text-gray-500">
                  +{groupedReactions.length - 3}
                </span>
              </li>
            )}
          </ul>
        </HoverCardContent>
      </HoverCard>
      {total && parseFloat(total) > 0 && (
        <div className="flex items-center gap-2 text-xs cursor-default rounded-full shadow-sm p-2 border">
          <Coins strokeWidth={1} size={20} />
          {total}
        </div>
      )}
    </div>
  )
}

export default PostCardLikeAndCommentWag
