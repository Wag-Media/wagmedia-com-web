import React, { Suspense } from "react"
import { getAuthor, getAuthorsList } from "@/data/dbAuthors"

import { AuthorPage } from "./AuthorPage"

export const generateMetadata = async ({
  params,
}: {
  params: { name: string }
}) => {
  const creator = await getAuthor(params.name)
  return {
    title: `Creator: ${creator?.name} - WagMedia`,
    description:
      creator?.bio ||
      "Discover the latest Polkadot news and insights from our creators.",
  }
}

export const generateStaticParams = async () => {
  const creators = await getAuthorsList()
  return creators.map((creator) => ({ name: creator.name }))
}

const PageAuthor = async ({ params }: { params: { name: string } }) => {
  if (!params.name || params.name === "") {
    return {
      notFound: true,
    }
  }

  return <AuthorPage name={params.name} />
}

export default PageAuthor
