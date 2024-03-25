import { prisma } from "@/prisma/prisma"

import page from "../app/(others)/dashboard/billing-address/page"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "./types"

export async function getPosts(): Promise<
  PostWithTagsCategoriesReactionsPaymentsUser[]
> {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
      isFeatured: false,
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
    take: 12,
  })

  return posts
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
  categoryId: number
): Promise<PostWithTagsCategoriesReactionsPaymentsUser[]> {
  const posts = await prisma.post.findMany({
    where: {
      isPublished: true,
      isDeleted: false,
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
