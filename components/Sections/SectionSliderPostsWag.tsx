"use client"

import React, { FC } from "react"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import Heading from "@/components/Heading/Heading"
import MySlider from "@/components/MySlider"

import Card11Wag from "../Card11/Card11Wag"

export interface SectionSliderPostsWagProps {
  className?: string
  heading: string
  subHeading?: string
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
  postCardName?: "card4" | "card7" | "card9" | "card10" | "card10V2" | "card11"
  perView?: 2 | 3 | 4
}

const SectionSliderPostsWag: FC<SectionSliderPostsWagProps> = ({
  className = "",
  posts,
  postCardName = "card11",
  perView = 3,
}) => {
  return (
    <div className={`nc-SectionSliderPostsWag py-8 ${className}`}>
      <MySlider
        data={posts}
        renderItem={(item, indx) => <Card11Wag key={indx} post={item} />}
        itemPerRow={perView}
      />
    </div>
  )
}

export default SectionSliderPostsWag
