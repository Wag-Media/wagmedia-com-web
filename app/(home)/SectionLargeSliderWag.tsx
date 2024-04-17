import React from "react"
import { getFeaturedPosts } from "@/data/dbPosts"

import { SliderDisplay } from "./SliderDisplay"

export default async function SectionLargeSliderWag() {
  const featuredPosts = await getFeaturedPosts()

  return (
    <div className={`nc-SectionLargeSliderWag relative`}>
      <SliderDisplay posts={featuredPosts} />
    </div>
  )
}
