import Link from "next/link"
import { Category, Post, Tag } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"

export const PostListItem = ({
  post,
}: {
  post: PostWithTagsCategoriesReactionsPaymentsUser
}) => {
  return (
    <div className="flex w-1/2 flex-col gap-4 rounded-xl border border-white p-4 ">
      <h2 className="font-bold">{post.title}</h2>
      <p className="text-sm">{post.content}</p>
      <div>
        <b>Categories:</b>
        <ul>
          {post.categories.map((category: Category) => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <b>Tags:</b>
        <ul>
          {post.tags.map((tag: Tag) => (
            <li key={tag.id}>#{tag.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <b>Reactions:</b>
        <ul>
          {post.reactions.map((reaction) => (
            <li key={reaction.id}>
              {reaction.emojiId} at {reaction.createdAt.toDateString()} from{" "}
              {reaction.user.name}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <b>Payments:</b>
        <ul>
          {post.payments.map((payment) => (
            <li key={payment.id}>
              {payment.amount} {payment.unit} at{" "}
              {payment.createdAt.toDateString()} from {post.user.name}
            </li>
          ))}
        </ul>
      </div>
      {post.link && <Link href={post.link}>discord</Link>}
    </div>
  )
}
