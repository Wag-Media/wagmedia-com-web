import { prisma } from "@/prisma/prisma"
import { Category } from "@prisma/client"

import { getPostsByCategoryId } from "./dbPosts"
import { CategoryWithCount } from "./types"

export async function getEnglishCategories(): Promise<CategoryWithCount[]> {
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
      _count: {
        select: { posts: true },
      },
    },
  })

  return categories.filter((category) => category._count.posts > 0)
}

export async function getCategories(): Promise<CategoryWithCount[]> {
  const categories = await prisma.category.findMany({
    include: {
      emoji: true,
      _count: {
        select: { posts: true },
      },
    },
  })

  return categories.filter((category) => category._count.posts > 0)
}

export async function getCategoriesWithPosts(categories: Category[]) {
  const categoriesWithPosts = await Promise.all(
    categories.map(async (category) => {
      const posts = await getPostsByCategoryId(category.id)

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
