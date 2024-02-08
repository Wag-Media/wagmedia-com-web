import Image from "next/image"
import Link from "next/link"
import { Category, Post, Tag } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { cn } from "@/lib/utils"

import { Button } from "../button"
import styles from "./post.module.scss"

export const PostListItem = ({
  post,
}: {
  post: PostWithTagsCategoriesReactionsPaymentsUser
}) => {
  return (
    <article
      className={cn(
        "min-w-[338px] rounded-sm p-8 font-sans shadow-sm transition-shadow hover:shadow-lg duration-1000",
        styles.card
      )}
    >
      <div className="mb-4 flex flex-row justify-between items-center">
        <div className="flex flex-row gap-4 text-base ">
          {post.user.avatar && (
            <Image
              className="rounded-full w-full"
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
          <ul className="flex flex-row gap-2 items-center">
            {post.reactions.map((reaction) => (
              <li key={reaction.id}>
                {reaction.emoji.url ? (
                  <Image
                    src={reaction.emoji.url}
                    alt={reaction.emoji.id}
                    width={30}
                    height={30}
                    className="inline-block"
                  />
                ) : (
                  <span className="align-middle text-[30px]">
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
      <div className="">
        <h2 className="font-bold mb-4">{post.title}</h2>
        <div>
          <ul className="flex flex-row flex-wrap gap-4 mb-4">
            {post.categories.map((category: Category) => (
              <li key={category.id} className={styles.category}>
                {category.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Link href={`/post/${post.slug}`} className="self-end w-full">
        <Button className="w-full">View Post</Button>
      </Link>
    </article>
  )
}
