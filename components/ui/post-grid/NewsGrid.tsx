import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import { Headline } from "../headline"
import { PostGridDisplay } from "./PostGridDisplay"

export interface NewsGridProps {
  initialPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  totalPostCount: number
  loadMoreNewsPromise: (
    currentPage: number,
    orderBy?: string,
    search?: string
  ) => Promise<PostWithTagsCategoriesReactionsPaymentsUser[]>
}

export default async function NewsGrid({
  initialPosts,
  totalPostCount,
  loadMoreNewsPromise,
}: NewsGridProps) {
  return (
    <div className={`nc-SectionGridPosts relative pt-16 pb-16 lg:pb-28`}>
      <Headline
        level="h2"
        className="mt-16"
        subtitle={`Explore ${totalPostCount} Polkadot ecosystem news uncovered by our news finders program, conveniently bundled together in one place.`}
      >
        What&apos;s the news and updates about the Polkadot ecosystem?
      </Headline>
      <PostGridDisplay
        initialPosts={initialPosts}
        totalPostCount={totalPostCount}
        loadMorePostsPromise={loadMoreNewsPromise}
        contentType="news"
      />
    </div>
  )
}
