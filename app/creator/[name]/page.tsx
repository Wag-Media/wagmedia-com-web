import React, { Suspense } from "react"
import { getAuthor, getAuthorsList } from "@/data/dbAuthors"
import { getPostsByAuthor } from "@/data/dbPosts"

import { AuthorPage } from "./AuthorPage"

export const revalidate = 20

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
