"use client"

import { useCallback, useEffect, useState } from "react"
import { getAgentTippingPosts, getThreadPosts } from "@/data/dbPosts"
import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  TypePostOrder,
} from "@/data/types"
import { Post } from "@prisma/client"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Loading from "@/components/Button/Loading"
import Card11Wag from "@/components/Card11/Card11Wag"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

export function AgentTipGrid({
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
  const [threadPosts, setThreadPosts] = useState<any[]>([])

  const loadMorePosts = useCallback(async () => {
    if (isLoadMoreDisabled || isLoading) return

    setIsLoading(true)

    const newPosts = await getAgentTippingPosts(currentPage + 1, pageSize)

    // const newPosts = await fetchPosts({
    //   page: currentPage + 1,
    //   pageSize: pageSize, // Correct parameter if API expects pageSize instead of take
    //   search: "", // Pass any actual search criteria needed
    //   orderBy,
    //   contentType,
    // })

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

    async function getThreadPostsAsync() {
      const threadPosts = await Promise.all(
        posts.map(async (post) => {
          const threadPosts = await getThreadPosts(post.id)
          return threadPosts
        })
      )
      setThreadPosts(threadPosts)
    }
    getThreadPostsAsync()
  }, [posts, totalPostCount])

  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {posts.map((post, index) => {
          return (
            <div className="flex flex-col overflow-scroll">
              {post.id}
              {post.discordLink}
              threadPosts:{" "}
              {threadPosts.find(
                (threadPost) => threadPost.parentPostId === post.id
              )}
              <Card11Wag key={index} post={post} />
            </div>
          )
        })}
      </div>
      <div className="flex items-center justify-center mt-20">
        {!isLoadMoreDisabled && (
          <ButtonPrimary onClick={loadMorePosts} disabled={isLoading}>
            Show me more {isLoading && <Loading className="ml-2" />}
          </ButtonPrimary>
        )}
      </div>
    </div>
  )
}
