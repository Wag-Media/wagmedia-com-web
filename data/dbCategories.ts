import { prisma } from "@/prisma/prisma"
import { Category, ContentType, Prisma } from "@prisma/client"
import { code, countries, name } from "country-emoji"
import _, { filter, orderBy } from "lodash"

import { deslugify, slugify } from "@/lib/slug"
import { getPostFlag } from "@/lib/utils"

import { getPostsByCategoryId } from "./dbPosts"
import { CategoryWithCount } from "./types"

const nonAngloCategories = ["Translations", "Non Anglo", "Dubbing"]

export async function getCategoryOverview(
  contentType: ContentType = ContentType.article
) {
  const categories = await prisma.category.findMany({
    where: {
      name: {
        notIn: [...nonAngloCategories, "Newsletter", "Tip", "Meme", "Events"],
      },
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          posts: {
            where: {
              isPublished: true,
              isDeleted: false,
              contentType,
              categories: {
                none: {
                  name: {
                    in: nonAngloCategories,
                  },
                },
              },
            },
          },
        },
      },
      posts: {
        where: {
          isPublished: true,
          isDeleted: false,
          contentType,
          categories: {
            none: {
              name: {
                in: nonAngloCategories,
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
        },
        take: 5,
      },
    },
  })

  return categories
    .filter((category) => category.posts.length > 0)
    .map((category) => ({
      ...category,
      slug: slugify(category.name),
    }))
}

export async function getNonAngloOverview() {
  const categories = await prisma.category.findMany({
    where: {
      name: {
        in: nonAngloCategories,
      },
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          posts: {
            where: {
              isPublished: true,
              isDeleted: false,
            },
          },
        },
      },
      posts: {
        where: {
          isPublished: true,
          isDeleted: false,
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
      },
    },
  })

  return categories.filter((category) => category.posts.length > 0)
}

export async function getEnglishCategories(
  contentType: ContentType = ContentType.article
): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { name: { equals: "Non Anglo" } },
        { name: { equals: "Translations" } },
        { name: { equals: "Newsletter" } },
        { emojiId: { equals: "Newsletter" } },
        { name: { equals: "Dubbing" } },
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

export async function getNonEnglishCategories(
  contentType: ContentType = ContentType.article
): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    where: {
      OR: [
        { name: "Non Anglo" },
        { name: "Translations" },
        { name: "Newsletter" },
        { emojiId: "Newsletter" },
        { name: "Dubbing" },
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

export async function getCategoriesNames() {
  const categories = await prisma.category.findMany({
    select: {
      name: true,
    },
  })

  return categories.map((category) => category.name)
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

export async function getCategoryWithArticlesAndNews(slug: string) {
  const decodedName = deslugify(slug)

  const category = await prisma.category.findFirst({
    where: {
      name: {
        equals: decodedName,
        mode: "insensitive",
      },
    },
  })

  const articlesCount = await prisma.post.count({
    where: {
      contentType: ContentType.article,
      isPublished: true,
      isDeleted: false,
      categories: {
        some: {
          name: category?.name,
        },
      },
    },
  })

  const articles = await prisma.post.findMany({
    take: 11,
    where: {
      contentType: ContentType.article,
      isPublished: true,
      isDeleted: false,
      categories: {
        some: {
          name: category?.name,
        },
      },
    },
    include: {
      categories: true,
      embeds: true,
      reactions: {
        include: {
          emoji: true,
          user: true,
        },
      },
      user: true,
      earnings: true,
    },
  })

  const newsCount = await prisma.post.count({
    where: {
      isPublished: true,
      isDeleted: false,
      contentType: ContentType.news,
      categories: {
        some: {
          name: category?.name,
        },
      },
    },
  })

  const news = await prisma.post.findMany({
    take: 12,
    where: {
      isPublished: true,
      isDeleted: false,
      contentType: ContentType.news,
      categories: {
        some: {
          name: category?.name,
        },
      },
    },
    include: {
      embeds: true,
      categories: true,
      reactions: {
        include: {
          emoji: true,
          user: true,
        },
      },
      user: true,
      earnings: true,
    },
  })

  return {
    ...category,
    articlesCount,
    newsCount,
    articles,
    news,
  }
}

function flagMatchesLanguage(flag: string, language: string) {
  const countryCode = code(flag)
  const countryName = name(flag)

  if (!countryName || !countryCode) {
    return false
  }

  let languageName = countries[countryCode][1]

  if (languageName === "Czech Republic") {
    languageName = "Czech"
  }

  return languageName.toLowerCase() === language.toLowerCase()
}

export async function getLanguageWithArticlesAndNews(slug: string) {
  const category = await getCategoryWithArticlesAndNews("Non Anglo")

  const language = {
    ...category,
    articles: category?.articles.filter((article) => {
      const flag = getPostFlag(article)
      return flag && flagMatchesLanguage(flag, slug)
    }),
    news: category?.news.filter((news) => {
      const flag = getPostFlag(news)
      return flag && flagMatchesLanguage(flag, slug)
    }),
  }

  return language
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

export async function searchCategories(search: string) {
  const where = search
    ? {
        name: {
          contains: search,
          mode: Prisma.QueryMode.insensitive,
        },
      }
    : {}

  const categories = await prisma.category.findMany({
    where,
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
    take: 5,
  })

  return categories
}
