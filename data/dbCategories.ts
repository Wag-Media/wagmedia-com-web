import { prisma } from "@/prisma/prisma"
import { Category, ContentType } from "@prisma/client"
import _, { filter, orderBy } from "lodash"

import { getPostsByCategoryId } from "./dbPosts"
import { CategoryWithCount } from "./types"

export async function getNonEnglishCategories(
  contentType: ContentType = ContentType.article
): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    where: {
      AND: [
        { name: { not: "Non Anglo" } },
        { name: { not: "Translations" } },
        { name: { not: "Newsletter" } },
        { emojiId: { not: "Newsletter" } },
        { name: { not: "Dubbing" } },
      ],
    },
    include: {
      emoji: true,
      posts: {
        where: {
          contentType: contentType, // Only include posts of a specific contentType
        },
        select: {
          id: true, // Select minimal fields necessary
        },
      },
    },
  })

  // Map categories to include the count of posts manually
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    postsCount: category.posts.length, // Calculate the number of posts
  }))

  // Filter categories to return only those with at least one post
  const filteredCategories = categoriesWithCount.filter(
    (category) => category.postsCount > 0
  )

  // Sort categories by the count of posts in descending order
  filteredCategories.sort((a, b) => b.postsCount - a.postsCount)

  return filteredCategories
}

export async function getCategories(
  contentType: ContentType = ContentType.article
): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    include: {
      emoji: true,
      _count: {
        select: { posts: true },
      },
      posts: {
        where: {
          contentType: contentType, // Only include posts of a specific contentType
        },
        select: {
          id: true, // Select minimal fields necessary
        },
      },
    },
  })

  // Map categories to include the count of posts manually
  const categoriesWithCount = categories.map((category) => ({
    ...category,
    postsCount: category.posts.length, // Calculate the number of posts
  }))

  // Filter categories to return only those with at least one post
  const filteredCategories = categoriesWithCount.filter(
    (category) => category.postsCount > 0
  )

  // Sort categories by the count of posts in descending order
  filteredCategories.sort((a, b) => b.postsCount - a.postsCount)

  return filteredCategories
}

export async function getCategoryWithArticlesAndNews(name: string) {
  const category = await prisma.category.findUnique({
    where: {
      name,
    },
    include: {
      emoji: true,
      _count: {
        select: { posts: true },
      },
      posts: {
        where: {
          isPublished: true,
          isDeleted: false,
          OR: [
            {
              contentType: ContentType.article,
            },
            {
              contentType: ContentType.news,
            },
          ],
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
      },
    },
  })

  if (!category) {
    return null
  }

  return {
    ...category,
    postsCount: category.posts.length,
    articles: category.posts.filter(
      (post) => post.contentType === ContentType.article
    ),
    news: category.posts.filter(
      (post) => post.contentType === ContentType.news
    ),
  }
}

export async function getCategoriesWithPosts(
  categories: Category[],
  contentType: "article" | "news" = "article"
) {
  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const posts = await getPostsByCategoryId(category.id, contentType)

      return {
        ...category,
        posts,
      }
    })
  )

  return categoriesWithPosts
}

export async function getCategoryByName(
  name: string
): Promise<Category | null> {
  const category = await prisma.category.findFirst({
    where: {
      name,
    },
  })

  return category
}
