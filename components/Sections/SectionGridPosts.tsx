import React, { FC, ReactNode } from "react"
import { PostDataType } from "@/data/types"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Card9 from "@/components/Card9/Card9"
import Card10 from "@/components/Card10/Card10"
import Card10V2 from "@/components/Card10/Card10V2"
import Card11 from "@/components/Card11/Card11"
import Heading from "@/components/Heading/Heading"

export interface SectionGridPostsProps {
  posts?: PostDataType[]
  className?: string
  gridClass?: string
  heading?: ReactNode
  subHeading?: ReactNode
  headingIsCenter?: boolean
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast"
}

const SectionGridPosts: FC<SectionGridPostsProps> = ({
  posts = [],
  postCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
}) => {
  const renderCard = (post: PostDataType) => {
    switch (postCardName) {
      case "card9":
        return <Card9 key={post.id} post={post} />
      case "card10":
        return <Card10 key={post.id} post={post} />
      case "card10V2":
        return <Card10V2 key={post.id} post={post} />
      case "card11":
        return <Card11 key={post.id} post={post} />
      default:
        return null
    }
  }

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter}>
        {heading}
      </Heading>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {posts.map((post) => renderCard(post))}
      </div>
      <div className="flex items-center justify-center mt-20">
        <ButtonPrimary loading>Show me more</ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionGridPosts
