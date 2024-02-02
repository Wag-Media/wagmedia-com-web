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
  const postlink = `/post/${post.slug}`

  return (
    <div className="overflow-hidden bg-white rounded shadow">
      <div className="p-0">
        <div className="relative h-[250px] overflow-hidden">
          {post.embedImageUrl ? (
            <>
              {/* <div
                className="size-full bg-cover bg-center bg-no-repeat"
                style={{
                  backgroundImage: `url(${post.embedImageUrl})`,
                }}
              ></div> */}
              <Link
                href={postlink}
                style={{
                  backgroundImage: `url(${post.embedImageUrl})`,
                }}
                className="bg-cover bg-center bg-no-repeat block "
              >
                {post.embedImageUrl.includes("discordapp") ? (
                  <Image
                    src={post.embedImageUrl}
                    alt={post.title}
                    width={400}
                    height={400}
                    className={cn("backdrop-blur-lg", styles.cover)}
                  />
                ) : (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={post.embedImageUrl}
                    alt={post.title}
                    width={400}
                    height={400}
                    className={cn("backdrop-blur-lg", styles.cover)}
                  />
                )}
              </Link>
            </>
          ) : (
            <div
              className="h-full bg-gradient-to-tr from-purple-500 to-pink-400"
              style={{
                // backgroundImage: `url(${post.categories[0]?.emoji?.url})`,
                backgroundRepeat: "repeat",
                backgroundPosition: "center",
                backgroundBlendMode: "multiply",
                backgroundColor: "rgba(255, 25, 40, 0.5)",
              }}
            ></div>
          )}

          <div className="absolute top-4 left-4">
            {post.categories.map((category: Category) => (
              <span
                key={category.id}
                className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full"
              >
                {category.name}
              </span>
            ))}
          </div>
        </div>
        <div className="px-5 pb-5">
          <div className="flex w-full justify-between items-center mt-6 ">
            <div className="flex items-center">
              {post.user.avatar && (
                <Image
                  className="h-8 rounded-full mr-2"
                  src={post.user.avatar}
                  width={30}
                  height={30}
                  alt={`${post.user.name}'s avatar`}
                />
              )}
              <span>{post.user.name}</span>
            </div>
            <span className="block text-sm font-semibold tracking-widest text-gray-500 uppercase">
              {post.createdAt.toLocaleDateString()}
            </span>
          </div>
          <p className="mt-5 text-2xl font-semibold">
            <a href={postlink} title="" className="text-black">
              {post.title}
            </a>
          </p>
          <p className="mt-4 text-base text-gray-600">
            {post.reactions.map((reaction) => (
              <span className="pr-2">
                {reaction.emoji.url ? (
                  <Image
                    src={reaction.emoji.url}
                    alt={reaction.emoji.id}
                    width={25}
                    height={25}
                    className="inline-block"
                  />
                ) : (
                  <span className="align-middle text-[25px]">
                    {reaction.emojiId}
                  </span>
                )}
              </span>
            ))}
          </p>
          <a
            href={postlink}
            title=""
            className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
          >
            Continue Reading
            <svg
              className="w-5 h-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fill-rule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
