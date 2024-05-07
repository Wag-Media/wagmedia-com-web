import React, { Suspense } from "react"

import { AuthorPage } from "./AuthorPage"

export const metadata = {
  title: "Author Page",
  description: "Author Page",
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
