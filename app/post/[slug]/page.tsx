import { Suspense } from "react"

import { SinglePostContent } from "./SinglePostContent"
import { SinglePostSkeleton } from "./SinglePostSkeleton"

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  let calculatedTitle = slug
    .split("-")
    .slice(0, -1)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")

  return (
    <Suspense fallback={<SinglePostSkeleton title={calculatedTitle} />}>
      <SinglePostContent slug={slug} />
      {/* <SinglePostSkeleton title={calculatedTitle} /> */}
    </Suspense>
  )
}
