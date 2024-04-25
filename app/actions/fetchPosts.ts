"use server"

import { getFeaturedPosts, getPosts } from "@/data/dbPosts"
import { TypePostOrder } from "@/data/types"
import orderBy from "lodash"

export const fetchPosts = async ({
  page = 0,
  pageSize = 12,
  search,
  orderBy = "latest",
}: {
  page?: number
  pageSize?: number
  search?: string
  orderBy?: TypePostOrder
}) => {
  const posts = await getPosts({
    skip: page * pageSize,
    take: pageSize,
    search,
    orderBy,
  })
  return posts
}

export const fetchFeaturedPosts = async () => {
  const posts = await getFeaturedPosts()
  return posts
}
