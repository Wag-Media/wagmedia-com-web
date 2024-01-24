"use server"

import prisma from "@/prisma/prisma"
import { Post } from "@prisma/client"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"

import { PostListItem } from "./post-list-item"

export async function PostList() {
  const posts: PostWithTagsCategoriesReactionsPaymentsUser[] =
    await prisma.post.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        categories: true,
        reactions: {
          include: {
            user: true,
          },
        },
        payments: true,
        user: true,
      },
    })
  return (
    <div className="flex flex-wrap gap-4">
      {posts.map((post: PostWithTagsCategoriesReactionsPaymentsUser) => (
        <PostListItem key={post.id} post={post} />
      ))}
    </div>
  )
}
