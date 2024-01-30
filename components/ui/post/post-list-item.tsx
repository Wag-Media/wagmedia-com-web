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
        <div>
          <h3>Categories</h3>
          <ul className="flex flex-row flex-wrap gap-4">
            {post.categories.map((category: Category) => (
              <li key={category.id}>{category.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  )
}
