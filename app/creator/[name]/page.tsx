import React, { Suspense } from "react"
import { getAuthor, getAuthorsList } from "@/data/dbAuthors"
import { getPostsByAuthor } from "@/data/dbPosts"

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
  const creators = await getAuthorsList()

  return creators
    .filter((creator) => creator.name)
    .map((creator) => ({
      name: creator.name,
    }))
}

const PageAuthor = async ({ params }: { params: { name: string } }) => {
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

  const posts = await getPostsByAuthor(params.name)

  return <AuthorPage author={author} posts={posts} />
}

export default PageAuthor
