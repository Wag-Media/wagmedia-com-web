"use client"

import { useCallback, useEffect, useState } from "react"
import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  TypePostOrder,
} from "@/data/types"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Loading from "@/components/Button/Loading"
import Card11Wag from "@/components/Card11/Card11Wag"
import Nav from "@/components/Nav/Nav"
import { fetchPosts } from "@/app/actions/fetchPosts"
import { replaceAuthorLinks } from "@/app/post/[slug]/util"

import { cn } from "../../../utils/cn"

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
      <div className="flex justify-between mb-4">
        {/* <Nav
          className=""
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map(({ id, label }, index) => (
            // <NavItem key={index}>{item}</NavItem>
            <div
              className={cn(
                "py-2 !mr-4 font-semibold border-b-2 rounded-none cursor-pointer",
                {
                  "border-black": id === orderBy,
                  "border-transparent": id !== orderBy,
                }
              )}
              key={index}
              onClick={() => handleClickTab(id)}
            >
              {label}
            </div>
          ))}
        </Nav> */}
        {/* <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6">
          <span>View all</span>
          <ArrowRightIcon className="w-6 h-6 ms-3 rtl:rotate-180" />
        </Button> */}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {posts.map((post, index) => (
          <Card11Wag key={index} post={post} />
        ))}
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
