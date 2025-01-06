import { Suspense } from "react"
import type { Metadata, ResolvingMetadata } from "next"
import { getPostBySlug } from "@/data/dbPosts"

import { deslugify } from "@/lib/slug"

import { SinglePostContent } from "./SinglePostContent"
import { SinglePostSkeleton } from "./SinglePostSkeleton"
import { removeSocialMediaEmbeds } from "./util"

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // read route params
  const slug = params.slug

  // fetch data
  const post = await getPostBySlug(slug)

  if (!post) {
    return {
      title: "Post not found",
      description: "Post not found",
    }
  }

  let description = removeSocialMediaEmbeds(post.content)
  if (description.length > 150) {
    description = description.slice(0, 150) + "..."
  }

  return {
    title: `${post.title} | ${post.categories.map((c) => c.name).join(", ")}`,
    description,
  }
}

export default async function PostPage({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params

  let calculatedTitle = deslugify(slug)

  return (
    <Suspense fallback={<SinglePostSkeleton title={calculatedTitle} />}>
      <SinglePostContent slug={slug} />
      {/* <SinglePostSkeleton title={calculatedTitle} /> */}
    </Suspense>
  )
}
