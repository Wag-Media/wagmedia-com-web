import { PostWithReactions } from "@/data/types"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function postHasFlag(post: PostWithReactions) {
  // Check if the post has a flag emoji in its reactions
  return post.reactions.some((reaction) => isCountryFlag(reaction.emoji.id))
}

export function getPostFlag(post: PostWithReactions) {
  // Get the flag emoji from the post reactions
  const flagReaction = post.reactions.find((reaction) =>
    isCountryFlag(reaction.emoji.id)
  )

  return flagReaction?.emoji.id || null
}

/**
 * Checks if the given emoji is a flag emoji
 * @param emoji
 * @returns
 */
export function isCountryFlag(emoji: string | null): boolean {
  if (!emoji) return false

  // Regular expression to match exactly one flag emoji
  // The ^ and $ anchors ensure that the entire string is just one flag emoji
  const flagRegex = /^\p{Regional_Indicator}{2}$/u

  return flagRegex.test(emoji)
}
