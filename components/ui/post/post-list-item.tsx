import Image from "next/image"
import Link from "next/link"
import { Category, Post, Tag } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { cn } from "@/lib/utils"

import styles from "./post.module.scss"

export const PostListItem = ({
  post,
}: {
  post: PostWithTagsCategoriesReactionsPaymentsUser
}) => {
  return (
    <article
      className={cn(
        "font-sans shadow-sm transition-shadow hover:shadow-lg",
        styles.card
      )}
    >
      {post.embedImageUrl && (
        <Link href={`/post/${post.slug}`}>
          {post.embedImageUrl.includes("discordapp") ? (
            <Image
              src={post.embedImageUrl}
              alt={post.title}
              width={400}
              height={400}
              className={styles.cover}
            />
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.embedImageUrl}
              alt={post.title}
              width={400}
              height={400}
              className={styles.cover}
            />
          )}
        </Link>
      )}
      <div className="p-4">
        <h2 className="font-bold">{post.title}</h2>
        {/* <p className="text-sm">{post.content}</p> */}
        <div>
          <h3>Categories</h3>
          <ul className="flex flex-row flex-wrap gap-4">
            {post.categories.map((category: Category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Tags</h3>
          <ul className="flex flex-row flex-wrap gap-4">
            {post.tags.map((tag: Tag) => (
              <li key={tag.id}>#{tag.name}</li>
            ))}
          </ul>
        </div>
        {/* <div>
          <b>Reactions:</b>
          <ul>
            {post.reactions.map((reaction) => (
              <li key={reaction.id}>
                {reaction.emojiId} at {reaction.createdAt.toDateString()} from{" "}
                {reaction.user.name}
              </li>
            ))}
          </ul>
        </div> */}
        {/* <div>
          <b>Payments:</b>
          <ul>
            {post.payments.map((payment) => (
              <li key={payment.id}>
                {payment.amount} {payment.unit} at{" "}
                {payment.createdAt.toDateString()} from {post.user.name}
              </li>
            ))}
          </ul>
        </div> */}
        {/* {post.discordLink && <Link href={post.discordLink}>discord</Link>} */}
      </div>
    </article>
  )
}
