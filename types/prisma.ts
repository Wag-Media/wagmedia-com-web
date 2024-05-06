import { OddJobWithUser } from "@/data/types"
import {
  Category,
  Embed,
  Emoji,
  OddJob,
  Payment,
  Post,
  Reaction,
  Tag,
  User,
} from "@prisma/client"

export type ReactionWithUser = Reaction & {
  user: User
}

export type ReactionWithUserAndEmoji = Reaction & {
  user: User
  emoji: Emoji
}

export type PostWithTagsCategoriesReactionsPaymentsUser = Post & {
  tags: Tag[]
  categories: (Category & { emoji: Emoji })[]
  reactions: ReactionWithUserAndEmoji[]
  payments: Payment[]
  embeds: Embed[]
  user: User
}
