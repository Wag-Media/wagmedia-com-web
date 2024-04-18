import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/prisma/prisma"
import { Embed, Tag } from "@prisma/client"

import CategoryBadgeListWag from "@/components/CategoryBadgeList/CategoryBadgeListWag"
import NcImage from "@/components/NcImage/NcImage"
import PostMeta2 from "@/components/PostMeta2/PostMeta2"
import PostMeta2Wag from "@/components/PostMeta2/PostMeta2Wag"
import { WagImage } from "@/components/WagImage/WagImage"

import SingleAuthor from "../SingleAuthor"
import SingleMetaAction2 from "../SingleMetaAction2"
import SingleRelatedPosts from "../SingleRelatedPosts"
import SingleTitle from "../SingleTitle"

export async function SinglePostContent({ slug }: { slug: string }) {
  const post = await prisma.post.findUnique({
    where: {
      slug: slug,
    },
    include: {
      tags: true,
      categories: true,
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
    },
  })

  if (!post) {
    return <div>No post found.</div>
  }

  const { title, user } = post

  return (
    <div className={`nc-PageSingle pt-8 lg:pt-16`}>
      <article className={`nc-PageSingle pt-8 lg:pt-16 space-y-10`}>
        <header className="rounded-xl">
          <div className="max-w-screen-md mx-auto">
            <div className={`nc-SingleHeader`}>
              <div className="space-y-5">
                <CategoryBadgeListWag
                  itemClass="!px-3"
                  categories={post.categories}
                />
                <SingleTitle title={title} />

                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
                  <PostMeta2Wag
                    size="large"
                    className="leading-none flex-shrink-0"
                    hiddenCategories
                    avatarRounded="rounded-full shadow-inner"
                    author={post.user}
                    date={post.createdAt}
                    categories={post.categories}
                  />
                  <SingleMetaAction2 />
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          id="single-entry-content"
          className="prose lg:prose-lg !max-w-screen-md mx-auto dark:prose-invert"
          // ref={contentRef}
        >
          <p className="mb-4 whitespace-break-spaces">{post.content}</p>

          <h3 className="font-bold">Embeds</h3>
          {post.embeds &&
            post.embeds.length > 0 &&
            post.embeds.map((embed: Embed) => (
              <>
                {embed.embedImage ? (
                  <WagImage
                    image={embed.embedImage || ""}
                    alt="Embed Image"
                    className="mb-4"
                    width={800}
                    height={400}
                  />
                ) : null}
              </>
            ))}
          <div className="mb-4">
            <strong>Published:</strong> {post.createdAt.toLocaleDateString()}
          </div>
          <div className="mb-4">
            {post.isPublished ? "Published" : "Draft"}
            {post.isFeatured && <span> | Featured</span>}
          </div>
          {/* <div className="pb-4">
        <h3 className="font-bold">Author:</h3>
        {post.user.avatar && (
          <Image
            className="h-8 rounded-full"
            src={post.user.avatar}
            width={30}
            height={30}
            alt={`${post.user.name}'s avatar`}
          />
        )}
        <span>{post.user.name}</span>
      </div> */}

          <div className="pb-4">
            <h3 className="font-bold">Links</h3>
            {post.discordLink && (
              <a href={post.discordLink} className="mb-4 block">
                Discord 🔗
              </a>
            )}
            {post.embeds &&
              post.embeds.length > 0 &&
              post.embeds.map((embed: Embed) => (
                <a href={embed.embedUrl || ""} className="mb-4 block">
                  Original Content 🔗
                </a>
              ))}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div>
              <h3 className="font-bold">Tags</h3>
              <div className="max-w-screen-md mx-auto flex flex-wrap">
                {post.tags.map((tag) => (
                  <Link
                    className={`nc-Tag inline-block bg-white hover:bg-neutral-50 text-sm text-neutral-600 dark:text-neutral-300 py-2 px-3 rounded-lg md:py-2.5 md:px-4 dark:bg-neutral-900 no-underline`}
                    href={`/tag/${tag.name}`}
                  >
                    #{`${tag.name}`}
                    {/* <span className="text-xs font-normal">
                  {" "}
                  ({tag._count})
                </span> */}
                  </Link>
                ))}
              </div>
            </div>
          )}
          <div>
            <h3 className="font-bold">Reactions</h3>
            <ul>
              {post.reactions.map((reaction) => (
                <li key={reaction.id}>
                  {reaction.emoji.url ? (
                    <Image
                      src={reaction.emoji.url}
                      alt={reaction.emoji.id}
                      width={30}
                      height={30}
                      className="inline-block !m-0 p-0"
                    />
                  ) : (
                    <span className="align-middle text-[30px]">
                      {reaction.emojiId}
                    </span>
                  )}{" "}
                  at {reaction.createdAt.toDateString()} from{" "}
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
        </div>
      </article>
      <div className="max-w-screen-md mx-auto border-b border-t border-neutral-100 dark:border-neutral-700 my-8"></div>
      <div className="max-w-screen-md mx-auto my-4 ">
        <SingleAuthor author={user} />
      </div>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  )
}
