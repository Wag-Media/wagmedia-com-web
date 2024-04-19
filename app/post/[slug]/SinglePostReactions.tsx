"use client"

import { useMemo } from "react"
import Image from "next/image"
import { ReactionWithUser, ReactionWithUserAndEmoji } from "@/data/types"
import { Reaction } from "@prisma/client"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface GroupedReaction {
  emojiId: string
  count: number
  emojiUrl: string | null
  reactions: ReactionWithUserAndEmoji[]
}

export function SinglePostReactions({
  reactions,
}: {
  reactions: ReactionWithUserAndEmoji[]
}) {
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
    <ul className="">
      {groupedReactions.map((group) => (
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger>
              {" "}
              <li key={group.emojiId} className="inline-block mr-4">
                {group.emojiUrl ? (
                  <Image
                    src={group.emojiUrl}
                    alt={group.emojiId}
                    width={30}
                    height={30}
                    className="inline-block m-0 p-0 mr-1"
                  />
                ) : (
                  <span className="align-middle text-[30px] mr-1">
                    {group.emojiId}
                  </span>
                )}
                <span className="text-sm text-gray-500">x{group.count}</span>
              </li>
            </TooltipTrigger>
            <TooltipContent sideOffset={10}>
              {group.reactions.map((reaction) => (
                <div key={reaction.id}>
                  {reaction.user.name} reacted on{" "}
                  {reaction.createdAt.toDateString()}
                </div>
              ))}
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </ul>
  )
}
