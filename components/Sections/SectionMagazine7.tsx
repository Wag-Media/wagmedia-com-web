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
          {/* {posts?.[0] && <Card10V3Wag post={posts[0]} />}
          {posts?.[1] && <Card10V3Wag post={posts[1]} />}
          {posts?.[2] && <Card10V3Wag post={posts[2]} />}
          {posts?.[3] && <Card10V3Wag post={posts[3]} />} */}
          {posts?.map((post) => {
            return <Card10V3Wag key={post.id} post={post} />
          })}
        </div>
        {/* <div className="grid grid-cols-1 gap-6 mt-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8">
          {posts?.map((post, index) => {
            if (index > 3) {
              return <Card10V3Wag key={post.id} post={post} />
            }
          })}
        </div> */}
      </div>
    </div>
  )
}

export default SectionMagazine7
