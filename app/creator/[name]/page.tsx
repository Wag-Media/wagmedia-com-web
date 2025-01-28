import React, { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { getAuthor, getAuthorsList } from "@/data/dbAuthors"
import { getPostsByAuthor, getPostsByAuthorCount } from "@/data/dbPosts"
import { Globe, TwitterIcon } from "lucide-react"

import { PostGridDisplay } from "@/components/ui/post-grid/PostGridDisplay"
import NcImage from "@/components/NcImage/NcImage"

import { AuthorPage } from "./AuthorPage"

export const revalidate = 20

export const generateMetadata = async ({
  params,
}: {
  params: { name: string }
}) => {
  if (!params.name || params.name === "") {
    return {
      title: "Creator - WagMedia",
      description:
        "Discover the latest Polkadot news and insights from our creators.",
    }
  }

  const creator = await getAuthor(params.name)

  if (!creator) {
    return {
      title: "Creator Not Found - WagMedia",
      description:
        "Discover the latest Polkadot news and insights from our creators.",
    }
  }

  return {
    title: `Creator: ${creator.name} - WagMedia`,
    description:
      creator.bio ||
      "Discover the latest Polkadot news and insights from our creators.",
  }
}

export const generateStaticParams = async () => {
  try {
    const creators = await getAuthorsList()

    if (!creators) return []

    return creators
      .filter((creator) => creator && creator.name)
      .map((creator) => ({
        name: creator.name,
      }))
  } catch (error) {
    console.error("Error generating static params:", error)
    return []
  }
}

export default async function PageAuthor({
  params,
}: {
  params: { name: string }
}) {
  if (!params.name || params.name === "") {
    return {
      notFound: true,
    }
  }

  const author = await getAuthor(params.name)

  if (!author) {
    return {
      notFound: true,
    }
  }

  const posts = await getPostsByAuthor(params.name, 0, 12)
  const totalPostCount = await getPostsByAuthorCount(params.name)

  const loadMorePosts = async (
    page: number,
    orderBy?: any,
    search?: string,
    contentType?: "article" | "news"
  ) => {
    "use server"
    const posts = await getPostsByAuthor(params.name, 12 + (page - 1) * 12, 12)
    return posts
  }

  const displayedRoles = [
    "Tier 1 Creator",
    "Tier 2 Creator",
    "Tier 3 Creator",
    "Tier 1 Finder",
    "Tier 2 Finder",
    "Non-Anglo",
  ]

  const userRoles = author?.roles.filter((role) =>
    displayedRoles.includes(role)
  ) || ["Wagmedia Creator"]

  return (
    <div className={`nc-PageAuthor `}>
      <div className="w-full">
        <div className="relative w-full h-40 2xl:h-60">
          {author?.banner ? (
            <NcImage
              alt=""
              containerClassName="absolute inset-0"
              sizes="(max-width: 1280px) 100vw, 1536px"
              src={author?.banner}
              className="object-cover w-full h-full"
              fill
              priority
            />
          ) : (
            <div className={`absolute w-full h-full`} />
          )}
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative flex flex-col p-5 rounded-sm dark:border-neutral-700 lg:p-8 md:rounded-xl md:flex-row">
            <div className="flex-shrink-0 w-32 mt-12 lg:w-40 sm:mt-0">
              <div className="relative z-0 inline-flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden text-xl font-semibold uppercase rounded-full shadow-2xl wil-avatar text-neutral-100 lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0">
                {author?.avatar && (
                  <Image
                    alt="Avatar"
                    src={`${author.avatar}?size=512`}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
              </div>
            </div>
            <div className="flex items-center flex-grow pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  <span>{author?.name}</span>
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {posts.length} published posts
                </span>
                <p className="block text-md">{author?.bio}</p>

                <div className="flex flex-row gap-4">
                  {author?.domain && (
                    <Link
                      href={author.domain}
                      className="flex flex-row items-center"
                    >
                      <Globe className="flex-shrink-0 w-4 h-4 mr-2" />
                      <span className="truncate text-neutral-700 dark:text-neutral-300">
                        {author.domain}
                      </span>
                    </Link>
                  )}
                  {author?.twitterUsername && (
                    <Link
                      href={`https://x.com/${author?.twitterUsername}`}
                      className="flex flex-row items-center"
                    >
                      <TwitterIcon className="flex-shrink-0 w-4 h-4 mr-2" />
                      <span className="truncate text-neutral-700 dark:text-neutral-300">
                        {author.twitterUsername}
                      </span>
                    </Link>
                  )}
                  <div>
                    {userRoles.map((role) => (
                      <span
                        className="inline-block p-0.5 px-2 text-sm rounded-full border border-neutral-200"
                        key={role}
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container py-8 space-y-8 lg:pb-28 lg:pt-8 lg:space-y-8">
        <PostGridDisplay
          initialPosts={posts}
          totalPostCount={totalPostCount}
          loadMorePostsPromise={loadMorePosts}
          contentType="article"
        />
        {/* <div className="grid gap-4 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 lg:mt-10">
          {posts?.map((post, index) => (
            <Card11Wag key={index} post={post} />
          ))}
        </div> */}
      </div>
    </div>
  )
}
