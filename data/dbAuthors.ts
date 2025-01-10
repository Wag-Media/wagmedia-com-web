import { prisma } from "@/prisma/prisma"
import { User } from "@prisma/client"

export async function getAuthor(name: string) {
  const decodedName = decodeURIComponent(name)
  const author = await prisma.user.findFirst({
    where: {
      name: decodedName,
    },
  })

  return author
}

export async function getAuthorsList() {
  const authors = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      discordId: true,
      avatar: true,
      avatarDecoration: true,
      banner: true,
      accentColor: true,
      bio: true,
    },
    orderBy: {
      posts: {
        _count: "desc",
      },
    },
  })

  return authors
}

export async function getAuthors({ limit = 10 }: { limit?: number }) {
  const authors = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      avatar: true,
      avatarDecoration: true,
      banner: true,
      accentColor: true,
      bio: true,
      discordId: true,
      domain: true,
      twitterUsername: true,
      posts: {
        where: {
          isPublished: true,
          isDeleted: false,
        },
        select: {
          id: true, // Select post id for counting
          title: true,
          earnings: {
            select: {
              totalAmount: true,
              unit: true,
            },
            where: {
              unit: {
                equals: "DOT",
              },
            },
            orderBy: {
              totalAmount: "desc",
            },
          },
        },
      },
    },
    orderBy: {
      posts: {
        _count: "desc", // Order by the count of posts descending
      },
    },
  })

  return authors
    .map(
      (
        author: User & {
          posts: {
            id: string
            title: string
            earnings: {
              totalAmount: number
              unit: string
            }[]
          }[]
        }
      ) => ({
        ...author,
        postCount: author.posts.length, // Calculate the number of posts for each author
        totalEarnings: author.posts.reduce(
          (sum, post) =>
            sum +
            post.earnings.reduce(
              (postSum, earning) => postSum + earning.totalAmount,
              0
            ),
          0
        ),
      })
    )
    .sort((a, b) => b.totalEarnings - a.totalEarnings) // Sort authors by total earnings in descending order
    .slice(0, limit) // Get the top 10 authors
}

export async function getAuthorsByIds(ids: string[]) {
  const authors = await prisma.user.findMany({
    where: {
      discordId: {
        in: ids,
      },
    },
    select: {
      id: true,
      name: true,
      avatar: true,
      avatarDecoration: true,
      banner: true,
      accentColor: true,
      bio: true,
      discordId: true,
    },
  })

  return authors
}
