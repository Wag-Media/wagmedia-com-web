"use client"

import { useCallback, useEffect, useState } from "react"
import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  ReactionWithUserAndEmoji,
  TypePostOrder,
} from "@/data/types"
import { Category, ContentEarnings, Embed, User } from "@prisma/client"

import { cn } from "@/lib/utils"
import Loading from "@/components/Button/Loading"
import Card11Wag from "@/components/Card11/Card11Wag"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { Button } from "../button"

interface PostProps {
  title: string
  categories: Category[]
  reactions: ReactionWithUserAndEmoji[]
  earnings: ContentEarnings[]
  slug: string
  embeds: Embed[]
  user?: Pick<User, "avatar" | "name">
  createdAt: Date
  content: string
}

export function PostGridDisplay({
  initialPosts,
  totalPostCount,
  loadMorePostsPromise,
  introCard,
  containerClassName,
}: {
  initialPosts: PostProps[]
  loadMorePostsPromise: (
    page: number,
    orderBy?: TypePostOrder,
    search?: string,
    contentType?: "article" | "news"
  ) => Promise<PostProps[]>
  totalPostCount: number
  contentType?: "article" | "news"
  introCard?: React.ReactNode
  containerClassName?: string
}) {
  const pageSize = 12
  const [posts, setPosts] = useState<PostProps[]>(initialPosts)
  const [currentPage, setCurrentPage] = useState(0)
  const [orderBy, setOrderBy] = useState<TypePostOrder>("latest")
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadMoreDisabled, setIsLoadMoreDisabled] = useState(
    initialPosts.length < pageSize
  )

  const loadMorePosts = useCallback(async () => {
    if (isLoadMoreDisabled || isLoading) return

    setIsLoading(true)
    try {
      const newPosts = await loadMorePostsPromise(currentPage + 1, orderBy, "")
      setCurrentPage(currentPage + 1)
      setPosts((prev) => [...prev, ...newPosts])
    } catch (error) {
      console.error("Failed to load more posts:", error)
    } finally {
      setIsLoading(false)
    }
  }, [
    currentPage,
    isLoading,
    isLoadMoreDisabled,
    orderBy,
    loadMorePostsPromise,
  ])

  useEffect(() => {
    setIsLoadMoreDisabled(posts.length >= totalPostCount)
  }, [posts, totalPostCount])

  return (
    <div>
      <div
        className={cn(
          "grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
          containerClassName
        )}
      >
        {introCard}
        {posts.map((post, index) => (
          <Card11Wag key={index} post={post} />
        ))}
      </div>
      <div className="flex items-center justify-center mt-10">
        {/* totalPostCount:{totalPostCount}
        posts.length:{posts.length}
        currentPage:{currentPage} */}
        {!isLoadMoreDisabled && (
          <Button
            onClick={loadMorePosts}
            disabled={isLoading}
            variant="outline"
            size="lg"
            className="min-w-[200px] "
          >
            Show me more {isLoading && <Loading className="ml-2" />}
          </Button>
        )}
      </div>
    </div>
  )
}
