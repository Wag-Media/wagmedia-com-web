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
  variant = "compact",
}: {
  post: PostWithTagsCategoriesReactionsPaymentsUser
  className?: string
  variant: "full" | "compact"
}) => {
  const firstEmbed = post.embeds?.[0] ?? null

  return (
    <div
      className={cn("article-wrap flex ", {
        "w-full": variant === "full",
        "lg:w-1/2 2xl:w-1/3": variant === "compact",
      })}
    >
      <article
        className={cn(
          "w-full flex border flex-col rounded-sm p-6 font-sans shadow-sm",
          "mb-4 mr-4 transition-shadow duration-1000 hover:shadow-lg",
          styles.card,
          className
        )}
      >
        <div className="mb-4 flex flex-row items-center justify-between">
          <div className="flex flex-row gap-4 text-base ">
            {post.user.avatar && (
              <div className="w-[40px] h-[40px]">
                <Image
                  className="w-full rounded-full"
                  src={post.user.avatar}
                  width={40}
                  height={40}
                  alt={`${post.user.name}'s avatar`}
                />
              </div>
            )}
            <div className="flex flex-col text-sm">
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

        {firstEmbed && firstEmbed.embedUrl && firstEmbed.embedImage ? (
          <div
            className={`bg-cover bg-center`}
            style={{
              backgroundImage: `url(${firstEmbed.embedImage})`,
            }}
          >
            <Link href={`/post/${post.slug}`}>
              {firstEmbed.embedImage?.includes("discordapp") ? (
                <Image
                  src={firstEmbed.embedImage}
                  alt={post.title}
                  width={400}
                  height={400}
                  className={styles.image}
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={firstEmbed.embedImage}
                  alt={post.title}
                  width={400}
                  height={400}
                  className={styles.image}
                />
              )}
            </Link>
          </div>
        ) : (
          <div className="h-[12rem] flex justify-center items-center text-gray-400 font-bold bg-slate-100">
            {/* {post.categories[0]?.emoji?.url ? (
            <Image
              src={post.categories[0]?.emoji?.url}
              alt={post.categories[0]?.emoji?.id}
              width={400}
              height={400}
              className="inline-block object-cover"
            />
          ) : ( */}
            <span className="align-middle text-[30px]">
              {post.categories[0]?.name}
            </span>
            {/* )} */}
          </div>
        )}
        <h2 className="mb-4 flex-1 font-bold mt-4">{post.title}</h2>
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
    </div>
  )
}
