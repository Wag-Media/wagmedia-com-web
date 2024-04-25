import React, { FC } from "react"
import { DEMO_POSTS_GALLERY } from "@/data/posts"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"

import Card10 from "@/components/Card10/Card10"
import Card10V3 from "@/components/Card10/Card10V3"
import Heading from "@/components/Heading/Heading"

import Card10V3Wag from "../Card10/Card10V3Wag"

export interface SectionMagazine7Props {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
  className?: string
}

const SectionMagazine7: FC<SectionMagazine7Props> = ({
  posts,
  className = "",
}) => {
  return (
    <div className={`nc-SectionMagazine7 relative mt-8`}>
      <div className={`grid grid-cols-1 gap-6 md:gap-8`}>
        <div className={`grid gap-6 md:gap-8 lg:grid-cols-2`}>
          {posts?.[0] && <Card10V3Wag post={posts[0]} />}
          {posts?.[1] && <Card10V3Wag galleryType={2} post={posts[1]} />}
          {posts?.[2] && <Card10V3Wag post={posts[2]} />}
          {posts?.[3] && <Card10V3Wag post={posts[3]} />}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-3">
          {posts?.[2] && <Card10V3Wag post={posts[2]} />}
          {posts?.[3] && <Card10V3Wag post={posts[3]} />}
          {posts?.[4] && <Card10V3Wag post={posts[4]} />}
          {posts?.[5] && <Card10V3Wag post={posts[5]} />}
        </div> */}
      </div>
    </div>
  )
}

export default SectionMagazine7
