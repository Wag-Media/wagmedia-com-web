import React, { Suspense } from "react"

import { AuthorPage } from "./AuthorPage"

const PageAuthor = async ({ params }: { params: { name: string } }) => {
  if (!params.name || params.name === "") {
    return {
      notFound: true,
    }
  }

  return (
    <Suspense fallback={<>Loading Author {params.name} ...</>}>
      <AuthorPage name={params.name} />
    </Suspense>
  )
}

export default PageAuthor
