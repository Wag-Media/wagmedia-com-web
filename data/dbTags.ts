import { prisma } from "@/prisma/prisma"

import { TagWithCount } from "./types"

export async function getTags(): Promise<TagWithCount[]> {
  const tags = await prisma.tag.findMany({
    include: {
      posts: {
        where: {
          isPublished: true,
          isDeleted: false,
        },
      },
      _count: {
        select: { posts: true },
      },
    },
    orderBy: {
      posts: {
        _count: "desc", // Order by the count of posts descending
      },
    },
  })

  return tags
}

export async function getTagByName(name: string) {
  const tag = await prisma.tag.findFirst({
    where: {
      name,
    },
  })

  return tag
}
