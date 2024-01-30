import Link from "next/link"
import { prisma } from "@/prisma/prisma"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { Ads } from "@/components/ui/ads"
import { PostList } from "@/components/ui/post/post-list"
import { PostTabs } from "@/components/ui/post/post-tabs"

export const fetchCache = "force-no-store"
export const revalidate = 0 // seconds
export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const posts: PostWithTagsCategoriesReactionsPaymentsUser[] =
    await prisma.post.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        categories: true,
        reactions: {
          include: {
            user: true,
          },
        },
        payments: true,
        user: true,
      },
    })

  return (
    <>
      <section>
        <Ads />
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Wagmedia UI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Accessible news from the Polkadot ecosystem.
          </p>
        </div>
        <PostTabs />
        <div className="flex gap-4">
          <PostList posts={posts} />
        </div>
      </section>
    </>
  )
}
