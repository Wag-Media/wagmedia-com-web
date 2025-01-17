import { cache } from "react"
import { prisma } from "@/prisma/prisma"
import { Prisma } from "@prisma/client"
import _ from "lodash"

import {
  PostWithTagsCategoriesReactionsPaymentsUser,
  TypePostOrder,
} from "./types"

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
  authorName: string
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const decodedAuthorName = decodeURIComponent(authorName)
  const posts = await prisma.post.findMany({
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

export async function getPostsByCategoryId(
  categoryId: number,
  contentType: "article" | "news" = "article"
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
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
  skip: number = 0,
  take: number = 12
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
    skip,
    take,
    where: {
      isPublished: true,
      isDeleted: false,
      categories: {
        some: {
          name: "Tip",
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
