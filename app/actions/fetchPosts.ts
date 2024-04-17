"use server"

import { getFeaturedPosts, getPosts } from "@/data/dbPosts"

export const fetchPosts = async ({
  page = 0,
  pageSize = 12,
  search,
}: {
  page?: number
  pageSize?: number
  search?: string
}) => {
  const posts = await getPosts({
    skip: page * pageSize,
    take: pageSize,
    search,
  })
  return posts
}

export const fetchFeaturedPosts = async () => {
  const posts = await getFeaturedPosts()
  return posts
}
