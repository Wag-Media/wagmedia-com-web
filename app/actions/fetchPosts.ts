"use server"

import { getPosts } from "@/data/dbPosts"

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
