import Link from "next/link"
import { prisma } from "@/prisma/prisma"
import { ContentEarnings, Embed, Payment, Tag, User } from "@prisma/client"
import orderBy from "lodash"

import { Headline } from "@/components/ui/headline"
import { AgentTipGrid } from "@/components/ui/post-grid/AgentTipGrid"
import Card11Wag from "@/components/Card11/Card11Wag"
import CategoryBadgeListWag from "@/components/CategoryBadgeList/CategoryBadgeListWag"
import PostCardWagMeta from "@/components/PostCardMeta/PostCardWagMeta"
import PostFeaturedWagMedia from "@/components/PostFeaturedMedia/PostFeaturedWagMedia"
import PostMeta2Wag from "@/components/PostMeta2/PostMeta2Wag"
import { WagImage } from "@/components/WagImage/WagImage"

import SingleAuthor from "../SingleAuthor"
import SingleMetaAction2 from "../SingleMetaAction2"
import SingleTitle from "../SingleTitle"
import { SinglePostEmbeds } from "./SinglePostEmbeds"
import { SinglePostReactions } from "./SinglePostReactions"
import { UserInfo } from "./user-info"
import {
  getEmbedType,
  linkTextsToAnchorTags,
  removeHtmlTags,
  removeLinks,
  removeSocialMediaEmbeds,
  replaceAuthorLinks,
} from "./util"

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
      earnings: true,
      user: true,
      embeds: true,
      threadPayments: true,
    },
  })

  const relatedPosts = await prisma.post.findMany({
    where: {
      user: {
        id: post?.user.id,
      },
      id: {
        not: post?.id,
      },
      isPublished: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: {
      user: true,
      embeds: true,
    },
  })

  let tipRecipient: Pick<User, "name" | "avatar"> | null = null
  let threadEarnings: ContentEarnings[] = []

  if (!post) {
    return <div>No post found.</div>
  }

  if (post.categories.find((c) => c.name === "Tip")) {
    const threadPost = await prisma.post.findFirst({
      where: {
        parentPostId: post.id,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })
    tipRecipient = threadPost?.user ?? null
  }

  if (tipRecipient) {
    threadEarnings = post.threadPayments.reduce(
      (acc: ContentEarnings[], curr: Payment) => {
        const existing = acc.find((e) => e.unit === curr.unit)
        if (existing) {
          existing.totalAmount = (existing.totalAmount || 0) + curr.amount
          curr.amount
        } else {
          acc.push({
            totalAmount: curr.amount,
            unit: curr.unit,
            postId: curr.postId,
            oddJobId: curr.oddJobId,
            id: curr.id,
          })
        }
        return acc
      },
      []
    )
  }

  const { title, user, embeds, earnings, reactions } = post
  const firstEmbed = embeds?.[0] ?? null
  const featuredImage = firstEmbed?.embedImage
  const embedType = getEmbedType(firstEmbed?.embedUrl)

  let tweetId: string | undefined = ""
  if (embedType === "twitter") {
    tweetId = firstEmbed.embedUrl?.split("/").pop()
  }

  let content = linkTextsToAnchorTags(post.content)
  content = await replaceAuthorLinks(content)

  const sanitizedTitle = await replaceAuthorLinks(post.title, false)

  return (
    <div className={`nc-PageSingle pt-8 lg:pt-16 mb-20`}>
      <article className={`nc-PageSingle pt-8 lg:pt-16 space-y-10 px-4`}>
        <header className="rounded-xl">
          <div className="max-w-screen-lg mx-auto">
            <div className={`nc-SingleHeader`}>
              <div className="space-y-5">
                <CategoryBadgeListWag
                  itemClass="!px-3"
                  categories={post.categories}
                />
                <SingleTitle title={sanitizedTitle} />
                <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
                <div className="flex flex-col justify-between space-y-5 sm:flex-row sm:items-end sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
                  {tipRecipient ? (
                    <>
                      <UserInfo
                        author={tipRecipient}
                        title={`Recipient: ${tipRecipient.name}`}
                        link={post.discordLink}
                        description={
                          <span className="text-pink-500 text-md">
                            {threadEarnings.map((earning) => (
                              <span key={earning.id}>
                                {earning.totalAmount} {earning.unit}
                              </span>
                            ))}
                          </span>
                        }
                      />
                      <UserInfo
                        author={post.user}
                        description={post.createdAt.toDateString()}
                        title={`Rewarded by ${post.user.name}`}
                        link={post.discordLink}
                      />
                    </>
                  ) : (
                    <>
                      <PostMeta2Wag
                        size="large"
                        className="flex-shrink-0 leading-none"
                        hiddenCategories
                        avatarRounded="rounded-full shadow-inner"
                        author={post.user}
                        date={post.createdAt}
                        categories={post.categories}
                      />
                      <SingleMetaAction2
                        earnings={earnings}
                        reactions={reactions}
                      />
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          id="single-entry-content"
          className="!max-w-screen-md mx-auto"
          // ref={contentRef}
        >
          {/* FEATURED IMAGE */}
          {featuredImage && (
            <>
              {!embedType && (
                <WagImage
                  alt="single"
                  className="w-full my-8 rounded-xl"
                  image={featuredImage}
                  containerClassName="w-full relative mb-4"
                  width={1260}
                  height={750}
                  sizes="(max-width: 1024px) 100vw, 1280px"
                />
              )}
              {embedType && <SinglePostEmbeds embeds={[firstEmbed]} />}
            </>
          )}
          <div
            className="mb-4 prose whitespace-break-spaces lg:prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{
              __html: content,
            }}
          />

          <SinglePostEmbeds embeds={embeds?.slice(1)} />
          {/* <div className="mb-4">
            {post.isPublished ? "Published" : "Draft"}
            {post.isFeatured && <span> | Featured</span>}
          </div> */}
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
              <a href={post.discordLink} className="block underline">
                🔗 Discord
              </a>
            )}
            {post.embeds &&
              post.embeds.length > 0 &&
              post.embeds.map((embed: Embed) => (
                <a href={embed.embedUrl || ""} className="block underline">
                  🔗 Original Content
                </a>
              ))}
          </div>

          {post.tags && post.tags.length > 0 && (
            <div>
              <h3 className="font-bold">Tags</h3>
              <div className="flex flex-wrap max-w-screen-md mx-auto">
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
          {!tipRecipient && (
            <div>
              <h3 className="mb-2 font-bold">Reactions</h3>
              <SinglePostReactions reactions={post.reactions} />
            </div>
          )}
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
        </div>
      </article>
      <div className="max-w-screen-lg mx-auto my-8 border-t border-b border-neutral-100 dark:border-neutral-700"></div>
      {!tipRecipient && (
        <>
          <div className="max-w-screen-lg px-2 mx-auto my-4 mb-12 md:px-0">
            <SingleAuthor author={user} />
            <div className="flex flex-col mt-16">
              <div className="flex flex-col">
                <Headline>More from this author</Headline>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {relatedPosts.length > 0 &&
                    relatedPosts.map((post) => (
                      <div
                        className={`nc-Card12 shadow-sm border-[1.5px] relative flex flex-col group rounded-sm overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-[var(--polkadot-pink)]`}
                      >
                        <div
                          className={`block flex-shrink-0 relative w-full overflow-hidden z-10 aspect-w-16 aspect-h-9`}
                        >
                          <div>
                            <PostFeaturedWagMedia
                              post={post}
                              className="h-[200px]"
                            />
                          </div>
                        </div>

                        <div className="flex flex-col h-full p-4 space-y-3">
                          <div className="relative flex-1">
                            <Link
                              href={`/post/${post.slug}`}
                              className="absolute inset-0"
                            ></Link>
                            <PostCardWagMeta
                              user={post.user}
                              createdAt={post.createdAt}
                            />
                            <h3 className="mb-2 leading-tight text-gray-900 dark:text-white text-normal font-unbounded">
                              {post.title}
                            </h3>
                            {post?.content && (
                              <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
                                {removeLinks(removeHtmlTags(post.content))}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
