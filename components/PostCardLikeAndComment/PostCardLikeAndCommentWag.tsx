import React, { FC, useMemo } from "react"
import Image from "next/image"
import { ReactionWithUserAndEmoji } from "@/data/types"
import { ContentEarnings } from "@prisma/client"
import { Coins, MessageCircleHeart, Smile, ThumbsUp } from "lucide-react"

import { totalEarnings } from "../../utils/totalPostEarnings"
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
    <div className="flex items-center justify-between w-full space-x-2">
      <HoverCard openDelay={0}>
        <HoverCardTrigger>
          <div className="flex items-center gap-2 text-xs rounded-full cursor-default">
            <MessageCircleHeart size={20} strokeWidth={2} color="#999" />
            {likeCount}
          </div>
        </HoverCardTrigger>
        <HoverCardContent>
          <ul className="flex flex-wrap gap-4">
            {groupedReactions.slice(0, sliceAfter).map((group) => (
              <li key={group.emojiId} className="inline-block">
                {group.emojiUrl ? (
                  <Image
                    src={group.emojiUrl}
                    alt={group.emojiId}
                    width={20}
                    height={20}
                    className="inline-block p-0 m-0 mr-1"
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
        <div className="flex items-center gap-2 text-xs rounded-full cursor-default">
          <Coins strokeWidth={2} size={20} color="#999" />
          {total}
        </div>
      )}
    </div>
  )
}

export default PostCardLikeAndCommentWag
