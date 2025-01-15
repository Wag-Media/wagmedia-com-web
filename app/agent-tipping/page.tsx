import { getAgentTippingPosts, getNewsletterPosts } from "@/data/dbPosts"

import PostGrid from "@/components/ui/post-grid/PostGrid"
import { PostGridDisplay } from "@/components/ui/post-grid/PostGridDisplay"
import Card10V3Wag from "@/components/Card10/Card10V3Wag"
import Heading from "@/components/Heading/Heading"
import SectionSubscribe2 from "@/components/SectionSubscribe2/SectionSubscribe2"
import SectionMagazine7 from "@/components/Sections/SectionMagazine7"

import { replaceAuthorLinks } from "../post/[slug]/util"

export const metadata = {
  title: "WagMedia Newsletter",
  description:
    "🎉 Thanks for reading WagMedia Weekly! Subscribe for free to receive new posts and support our work.",
}

export default async function PageCategories() {
  const posts = await getAgentTippingPosts()
  const postsWithLinks = await Promise.all(
    posts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )

  return (
    <div className="container relative py-8 lg:py-16">
      <Heading desc="Ecosystem actors who were rewarded for their positive contributions to the Polkadot ecosystem">
        Agent Tipping
      </Heading>

      <PostGridDisplay
        initialPosts={postsWithLinks}
        totalPostCount={posts.length}
      />
    </div>
  )
}
