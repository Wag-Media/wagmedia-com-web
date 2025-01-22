import { getAgentTippingPosts } from "@/data/dbPosts"
import { ContentEarnings, Payment } from "@prisma/client"

import { AgentTipGrid } from "@/components/ui/post-grid/AgentTipGrid"
import Heading from "@/components/Heading/Heading"

import { replaceAuthorLinks } from "../post/[slug]/util"

export const revalidate = 60

export const metadata = {
  title: "Agent Tipping",
  description:
    "Ecosystem actors who were rewarded for their positive contributions to the Polkadot ecosystem",
}

export default async function PageCategories() {
  const posts = await getAgentTippingPosts()

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
            })
          }
          return acc
        },
        []
      )

      return { ...post, title, earnings }
    })
  )

  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="Ecosystem actors who were rewarded for their positive contributions to the Polkadot ecosystem">
        Agent Tipping
      </Heading>
      <AgentTipGrid
        initialPosts={postsWithLinks}
        totalPostCount={posts.length}
      />
    </div>
  )
}
