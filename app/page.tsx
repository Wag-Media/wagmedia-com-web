import { prisma } from "@/prisma/prisma"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { Ads } from "@/components/ui/ads"
import { PostList } from "@/components/ui/post/post-list"
import { PostSlider } from "@/components/ui/post/post-slider"
import { PostTabs } from "@/components/ui/post/post-tabs"
import { Tab } from "@/components/ui/tabs/tabs"
import { Newsletter } from "@/components/newsletter/newsletter"

export const fetchCache = "force-no-store"
export const revalidate = 0 // seconds
export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const posts: PostWithTagsCategoriesReactionsPaymentsUser[] =
    await prisma.post.findMany({
      where: {
        isPublished: true,
        isDeleted: false,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        categories: {
          include: {
            emoji: true,
          },
        },
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

  const featuredPosts = posts.filter((post) => post.isFeatured)
  const mostLikedPosts = [...posts].sort(
    (a, b) => b.reactions.length - a.reactions.length
  )
  const trendingPosts = [...posts].sort(
    (a, b) => b.payments.length - a.payments.length
  )

  const newsletterPosts = posts.filter((post) => post)

  const tabs: Tab[] = [
    {
      label: "Latest",
      content: <PostList posts={posts} />,
    },
    {
      label: "Most Liked",
      content: <PostList posts={mostLikedPosts} />,
    },
    {
      label: "Trending",
      content: <PostList posts={trendingPosts} />,
    },
  ]

  return (
    <>
      <section>
        <Ads />
      </section>
      <section className="px-16 container py-6 md:py-10">
        {featuredPosts.length > 0 && <PostSlider posts={featuredPosts} />}
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex flex-col items-start gap-2">
          {/* <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Wagmedia UI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Accessible news from the Polkadot ecosystem.
          </p> */}
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-2/3">
            <PostTabs className="mb-4" tabs={tabs} />
          </div>
          <div className="w-1/3 px-4 sticky top-[5rem] self-start">
            <h3 className="text-[34px] mb-4 leading-[34px]">News</h3>
            <Newsletter />
          </div>
        </div>
      </section>
    </>
  )
}
