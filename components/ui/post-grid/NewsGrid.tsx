import { ReactNode } from "react"
import { getPosts, getTotalPostCount } from "@/data/dbPosts"

import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Headline } from "../headline"
import { PostGridDisplay } from "./PostGridDisplay"

export interface NewsGridProps {
  currentPage?: number
  search?: string
  className?: string
  gridClass?: string
  heading?: ReactNode
  headingIsCenter?: boolean
}

export default async function NewsGrid({
  search,
  className = "",
}: NewsGridProps) {
  const posts = await getPosts({
    search,
    contentType: "news",
  })
  const postsWithLinks = await Promise.all(
    posts.map(async (post) => {
      const title = await replaceAuthorLinks(post.title, false)
      return { ...post, title }
    })
  )
  const totalPostCount = await getTotalPostCount("news")

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Headline
        level="h2"
        className="mt-16"
        subtitle={`Explore ${totalPostCount} Polkadot ecosystem news uncovered by our news finders program, conveniently bundled together in one place.`}
      >
        What&apos;s the news and updates about the Polkadot ecosystem?
      </Headline>
      <PostGridDisplay
        initialPosts={postsWithLinks}
        totalPostCount={totalPostCount}
        contentType="news"
      />
    </div>
  )
}
