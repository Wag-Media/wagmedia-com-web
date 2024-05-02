"use server"

import { getFeaturedPosts, getPosts } from "@/data/dbPosts"
import { TypePostOrder } from "@/data/types"
import { ContentType } from "@prisma/client"
import orderBy from "lodash"

export const fetchPosts = async ({
  page = 0,
  pageSize = 12,
  search,
  orderBy = "latest",
  contentType = "article",
}: {
  page?: number
  pageSize?: number
  search?: string
  orderBy?: TypePostOrder
  contentType?: ContentType
}) => {
  const posts = await getPosts({
    skip: page * pageSize,
    take: pageSize,
    search,
    orderBy,
    contentType,
  })
  return posts
}

export const fetchFeaturedPosts = async () => {
  const posts = await getFeaturedPosts()
  return posts
}
