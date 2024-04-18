import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { prisma } from "@/prisma/prisma"
import { Embed, Tag } from "@prisma/client"

import CategoryBadgeListWag from "@/components/CategoryBadgeList/CategoryBadgeListWag"
import NcImage from "@/components/NcImage/NcImage"
import PostMeta2 from "@/components/PostMeta2/PostMeta2"
import PostMeta2Wag from "@/components/PostMeta2/PostMeta2Wag"
import { WagImage } from "@/components/WagImage/WagImage"

import SingleContent from "../SingleContent"
import SingleMetaAction2 from "../SingleMetaAction2"
import SingleTitle from "../SingleTitle"
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
