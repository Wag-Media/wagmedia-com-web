import { getAgentTippingPosts } from "@/data/dbPosts"
import { ContentEarnings, Payment } from "@prisma/client"

import { PostGridDisplay } from "@/components/ui/post-grid/PostGridDisplay"
import Heading from "@/components/Heading/Heading"

import { replaceAuthorLinks } from "../post/[slug]/util"

export const revalidate = 60

export const metadata = {
  title: "Agent Tipping",
  description:
    "Ecosystem actors who were rewarded for their positive contributions to the Polkadot ecosystem",
}

export default async function PageCategories() {
  const { posts, totalCount } = await getAgentTippingPosts()

  const postsWithLinks = await Promise.all(
    posts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      const earnings: ContentEarnings[] = post.threadPayments.reduce(
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
              eventId: curr.eventId,
            })
          }
          return acc
        },
        []
      )

      const user = post.recipient ?? post.user

      return { ...post, title, earnings, user }
    })
  )

  const paidPosts = postsWithLinks.filter((post) =>
    post.earnings.some((earning) => earning.totalAmount > 0)
  )

  const loadMorePosts = async (page: number) => {
    "use server"
    const { posts: newPosts } = await getAgentTippingPosts(page)

    const postsWithLinks = await Promise.all(
      newPosts.map(async (post) => {
        const title = await replaceAuthorLinks(post.title, false)
        const earnings: ContentEarnings[] = post.threadPayments.reduce(
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
                eventId: curr.eventId,
              })
            }
            return acc
          },
          []
        )

        const user = post.recipient ?? post.user

        return { ...post, title, earnings, user }
      })
    )

    const paidPosts = postsWithLinks.filter((post) =>
      post.earnings.some((earning) => earning.totalAmount > 0)
    )
    return paidPosts
  }

  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="Ecosystem actors who were rewarded for their positive contributions to the Polkadot ecosystem">
        Agent Tipping
      </Heading>
      <PostGridDisplay
        initialPosts={paidPosts}
        totalPostCount={totalCount}
        loadMorePostsPromise={loadMorePosts}
      />
    </div>
  )
}
