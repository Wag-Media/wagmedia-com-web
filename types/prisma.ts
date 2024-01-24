import { Category, Payment, Post, Reaction, Tag, User } from "@prisma/client"

export type ReactionWithUser = Reaction & {
  user: User
}

export type PostWithTagsCategoriesReactionsPaymentsUser = Post & {
  tags: Tag[]
  categories: Category[]
  reactions: ReactionWithUser[]
  payments: Payment[]
  user: User
}

export type PaymentFull = Payment & {
  Post: PostWithTagsCategoriesReactionsPaymentsUser
  reaction: ReactionWithUser
}
