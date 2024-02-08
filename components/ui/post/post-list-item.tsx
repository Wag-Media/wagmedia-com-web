import Image from "next/image"
import Link from "next/link"
import { Category, Post, Tag } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { cn } from "@/lib/utils"

import { Button } from "../button"
import styles from "./post.module.scss"

export const PostListItem = ({
  post,
  className,
}: {
  post: PostWithTagsCategoriesReactionsPaymentsUser
  className?: string
}) => {
  return (
    <article
      className={cn(
        "flex w-full flex-col rounded-sm p-6 font-sans shadow-sm transition-shadow duration-1000 hover:shadow-lg lg:w-1/2 2xl:w-1/3",
        styles.card,
        className
      )}
    >
      <div className="mb-4 flex flex-row items-center justify-between">
        <div className="flex flex-row gap-4 text-base ">
          {post.user.avatar && (
            <Image
              className="w-full rounded-full"
              src={post.user.avatar}
              width={40}
              height={40}
              alt={`${post.user.name}'s avatar`}
            />
          )}
          <div className="flex flex-col">
            <span className="font-bold">{post.user.name}</span>
            <span className="font-light">12/12/2024</span>
          </div>
        </div>
        <div>
          <ul className="flex flex-row items-center gap-2">
            {post.reactions.map((reaction) => (
              <li key={reaction.id}>
                {reaction.emoji.url ? (
                  <Image
                    src={reaction.emoji.url}
                    alt={reaction.emoji.id}
                    width={20}
                    height={20}
                    className="inline-block"
                  />
                ) : (
                  <span className="align-middle text-[20px]">
                    {reaction.emojiId}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      {post.embedImageUrl && (
        <div
          className={`mb-4 bg-cover bg-center`}
          style={{
            backgroundImage: `url(${post.embedImageUrl})`,
          }}
        >
          <Link href={`/post/${post.slug}`}>
            {post.embedImageUrl.includes("discordapp") ? (
              <Image
                src={post.embedImageUrl}
                alt={post.title}
                width={400}
                height={400}
                className={styles.image}
              />
            ) : (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.embedImageUrl}
                alt={post.title}
                width={400}
                height={400}
                className={styles.image}
              />
            )}
          </Link>
        </div>
      )}
      <h2 className="mb-4 flex-1 font-bold">{post.title}</h2>
      <div>
        <ul className="mb-4 flex flex-row flex-wrap gap-4">
          {post.categories.map((category: Category) => (
            <li key={category.id} className={styles.category}>
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <Link href={`/post/${post.slug}`} className="w-full self-end">
        <Button className="w-full">View Post</Button>
      </Link>
    </article>
  )
}
