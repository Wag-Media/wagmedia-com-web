"use client"

import { useCallback, useEffect, useState } from "react"
import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  TypePostOrder,
} from "@/data/types"

import Loading from "@/components/Button/Loading"
import Card11Wag from "@/components/Card11/Card11Wag"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Button } from "../button"

export function PostGridDisplay({
  initialPosts,
  totalPostCount,
  contentType = "article",
}: {
  initialPosts: PostWithTagsCategoriesReactionsPaymentsUser[]
  totalPostCount: number
  contentType?: "article" | "news"
}) {
  const pageSize = 12
  const [posts, setPosts] =
    useState<PostWithTagsCategoriesReactionsPaymentsUser[]>(initialPosts)
  const [currentPage, setCurrentPage] = useState(0) // Start from page 0 for correct API offset calculation
  const [orderBy, setOrderBy] = useState<TypePostOrder>("latest") // Start from page 0 for correct API offset calculation
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
      orderBy,
      contentType,
    })

    const postsWithLinks = await Promise.all(
      newPosts.map(async (post) => {
        const title = await replaceAuthorLinks(post.title, false)
        return { ...post, title }
      })
    )

    setCurrentPage(currentPage + 1)
    setPosts((prev) => [...prev, ...postsWithLinks])
    setIsLoading(false)
  }, [currentPage, isLoading, isLoadMoreDisabled, orderBy])

  useEffect(() => {
    setIsLoadMoreDisabled(posts.length >= totalPostCount)
  }, [posts, totalPostCount])

  const tabs: { id: TypePostOrder; label: string }[] = [
    { id: "latest", label: "Latest" },
    { id: "reactions", label: "Most Reactions" },
  ]

  const handleClickTab = async (id: TypePostOrder) => {
    console
    if (id === orderBy) {
      return
    }
    setOrderBy(id)
    setIsLoading(true)
    const newPosts = await fetchPosts({
      page: 0,
      pageSize: pageSize, // Correct parameter if API expects pageSize instead of take
      search: "", // Pass any actual search criteria needed
      orderBy: id,
      contentType,
    })
    setPosts([...newPosts])
    setIsLoading(false)
  }

  return (
    <div className="">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {posts.map((post, index) => (
          <Card11Wag key={index} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        {!isLoadMoreDisabled && (
          <Button
            onClick={loadMorePosts}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="min-w-[200px] bg-background text-[#FF2670] hover:bg-[#FF2670] hover:text-white font-sans"
          >
            Show me more {isLoading && <Loading className="ml-2" />}
          </Button>
        )}
      </div>
    </div>
  )
}
