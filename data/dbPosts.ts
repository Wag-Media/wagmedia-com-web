"use server"

import { cache } from "react"
import { prisma } from "@/prisma/prisma"
import { ContentEarnings, Payment, Prisma } from "@prisma/client"
import { countries } from "country-emoji"
import _ from "lodash"

import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  TypePostOrder,
} from "./types"
import { allFlagEmojis } from "./util"

export async function getPosts({
  skip = 0,
  take = 12,
  search,
  orderBy,
  contentType = "article",
}: {
  skip?: number
  take?: number
  search?: string
  orderBy?: TypePostOrder
  contentType?: "article" | "news"
}): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const order: Prisma.PostOrderByWithRelationInput =
    orderBy === "reactions"
      ? { reactions: { _count: "desc" } }
      : orderBy === "earnings"
      ? {
          payments: { _count: "desc" },
        }
      : { createdAt: "desc" }

  const where = {
    isPublished: true,
    isDeleted: false,
    isFeatured: false,
    contentType,
    ...(search && {
      title: {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      },
    }),
  }

  const posts = await prisma.post.findMany({
    where,
    orderBy: order,
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: {
        where: {
          unit: {
            equals: "DOT",
          },
        },
        orderBy: {
          totalAmount: "desc",
        },
      },
      _count: {
        select: { reactions: true, payments: true },
      },
    },
    take,
    skip,
  })

  return posts
}

export async function getTotalPostCount(
  contentType: any = "article"
): Promise<number> {
  const totalPostCount = await prisma.post.count({
    where: {
      isPublished: true,
      isDeleted: false,
      isFeatured: false,
      contentType,
    },
  })

  return totalPostCount
}

export async function getFeaturedPosts(): Promise<
  PostWithTagsCategoriesReactionsPaymentsUser[]
> {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      isFeatured: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
    take: 8,
  })

  return posts
}

export async function getPostsByAuthor(
  authorName: string,
  skip: number = 0,
  take: number = 12
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const decodedAuthorName = decodeURIComponent(authorName)
  const posts = await prisma.post.findMany({
    skip,
    take,
    where: {
      isPublished: true,
      isDeleted: false,
      user: {
        name: decodedAuthorName,
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })

  return posts
}

export async function getPostsByAuthorCount(authorName: string) {
  const count = await prisma.post.count({
    where: {
      isPublished: true,
      isDeleted: false,
      user: {
        name: authorName,
      },
    },
  })
  return count
}

export async function getPostsByLanguage({
  flag,
  page = 0,
  pageSize = 12,
}: {
  flag?: string
  page?: number
  pageSize?: number
}) {
  const posts = await prisma.post.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      categories: {
        some: {
          name: "Non Anglo",
        },
      },
      reactions: {
        some: {
          emoji: {
            id: {
              equals: flag,
            },
          },
        },
      },
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })
  return posts
}

export async function getPostsByCategoryId(
  categoryId: number,
  contentType: "article" | "news" = "article",
  skip: number = 0,
  take: number = 12
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
    skip: skip,
    take: take,
    where: {
      isPublished: true,
      isDeleted: false,
      contentType,
      categories: {
        some: {
          id: categoryId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })

  return posts
}

export async function getPostsByTagId(
  tagId: number
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      tags: {
        some: {
          id: tagId,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })

  return posts
}

export async function getNewsletterPosts(): Promise<
  PostWithTagsCategoriesReactionsPaymentsUser[]
> {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      categories: {
        some: {
          name: "Newsletter",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })

  return posts
}

export async function getAuthorPostCount(authorName: string) {
  const count = await prisma.post.count({
    where: {
      user: {
        name: authorName,
      },
    },
  })
  return count
}

export const getPostBySlug = cache(async (slug: string) => {
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      tags: true,
      categories: true,
      embeds: true,
    },
  })
  return post
})

export async function getAgentTippingPosts(
  page: number = 0,
  pageSize: number = 12
): Promise<{
  totalCount: number
  posts: (PostWithTagsCategoriesReactionsPaymentsUser & {
    threadPayments: Payment[]
    recipient?: {
      name: string | null
      avatar: string | null
    }
  })[]
}> {
  // First get the tipping posts
  const tippingPosts = await prisma.post.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      isDeleted: false,
      categories: {
        some: {
          name: "Tip",
        },
      },
      threadPayments: {
        some: {
          amount: {
            gt: 0,
          },
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
      threadPayments: {
        include: {
          user: true,
        },
      },
    },
  })

  const totalCount = await prisma.post.count({
    where: {
      isDeleted: false,
      categories: {
        some: { name: "Tip" },
      },
      threadPayments: {
        some: {
          amount: {
            gt: 0,
          },
        },
      },
    },
  })

  // Then for each tipping post, find its child post (the one that's being tipped)
  const postsWithRecipients = await Promise.all(
    tippingPosts.map(async (post) => {
      const threadPost = await prisma.post.findFirst({
        where: {
          parentPostId: post.id,
        },
        include: {
          user: {
            select: {
              name: true,
              avatar: true,
            },
          },
        },
      })

      return {
        ...post,
        recipient: threadPost?.user ?? undefined,
      }
    })
  )

  return {
    totalCount,
    posts: postsWithRecipients,
  }
}

export async function getAgentTippingPostsCount() {
  const count = await prisma.post.count({
    where: {
      isDeleted: false,
      categories: {
        some: {
          name: "Tip",
        },
      },
    },
  })
  return count
}

export async function getMemes(
  page: number = 0,
  pageSize: number = 100
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
    skip: page * pageSize,
    take: pageSize,
    where: {
      isPublished: true,
      isDeleted: false,
      categories: {
        some: {
          name: "Meme",
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      tags: true,
      categories: {
        include: {
          emoji: true,
        },
      },
      reactions: {
        include: {
          user: true,
          emoji: true,
        },
      },
      payments: true,
      user: true,
      embeds: true,
      earnings: true,
    },
  })

  return posts
}

export async function getTotalPostPaymentAmount() {
  const totalPostPayments = await prisma.payment.aggregate({
    where: {
      oddJobId: null,
      Post: {
        isPublished: true,
      },
    },
    _sum: {
      amount: true,
    },
  })
  return totalPostPayments
}
