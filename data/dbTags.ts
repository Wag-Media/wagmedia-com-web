import { prisma } from "@/prisma/prisma"

import { TagWithCount } from "./types"

export async function getTags(): Promise<TagWithCount[]> {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
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
