import { prisma } from "@/prisma/prisma"
import { totalEarnings } from "@/utils/totalPostEarnings"
import orderBy from "lodash"
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
}: {
  skip?: number
  take?: number
  search?: string
  orderBy?: TypePostOrder
}): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const order =
    orderBy === "reactions"
      ? { reactions: { _count: "desc" } }
      : orderBy === "earnings"
      ? {
          payments: { _count: "desc" },
        }
      : { createdAt: "desc" }

  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      isFeatured: false,
      contentType: "article",
    },
    orderBy: order as any,
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

export async function getTotalPostCount(): Promise<number> {
  const totalPostCount = await prisma.post.count({
    where: {
      isPublished: true,
      isDeleted: false,
      isFeatured: false,
      contentType: "article",
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
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      user: {
        name: authorName,
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
    take: 3,
  })

  return posts
}
