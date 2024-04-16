"use client"

import { useCallback, useEffect, useState } from "react"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Card11Wag from "@/components/Card11/Card11Wag"
import { fetchPosts } from "@/app/actions/fetchPosts"

export function PostGridDisplay({
  initialPosts,
  totalPostCount,
}: {
  initialPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  totalPostCount: number
}) {
  const pageSize = 12
  const [posts, setPosts] =
    useState<PostWithTagsCategoriesReactionsPaymentsUser[]>(initialPosts)
  const [currentPage, setCurrentPage] = useState(0) // Start from page 0 for correct API offset calculation
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(
    initialPosts.length < pageSize
  )

  const loadMorePosts = useCallback(async () => {
    if (isLoadMoreDisabled || isLoading) return

    setIsLoading(true)
    const newPosts = await fetchPosts({
      page: currentPage + 1,
      pageSize: pageSize, // Correct parameter if API expects pageSize instead of take
      search: "", // Pass any actual search criteria needed
    })

    setCurrentPage(currentPage + 1)
    setPosts((prev) => [...prev, ...newPosts])
    setIsLoading(false)
  }, [currentPage, isLoading, isLoadMoreDisabled])

  useEffect(() => {
    setIsLoadMoreDisabled(posts.length >= totalPostCount)
  }, [posts, totalPostCount])

  return (
    <div className="mt-8">
      <div className="grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 lg:gap-8 xl:grid-cols-4">
        {posts.map((post, index) => (
          <Card11Wag key={index} post={post} />
        ))}
      </div>
      <div className="mt-20 flex items-center justify-center">
        post.length: {posts.length}, totalPostCount: {totalPostCount}
        {!isLoadMoreDisabled && (
          <ButtonPrimary onClick={loadMorePosts} disabled={isLoading}>
            {isLoading ? "Loading..." : "Show me more"}
          </ButtonPrimary>
        )}
      </div>
    </div>
  )
}
