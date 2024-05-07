import React, { FC } from "react"
import { getTags } from "@/data/dbTags"
import { TagWithCount, TaxonomyType } from "@/data/types"

import Heading from "@/components/Heading/Heading"

import MySlider from "../MySlider"
import TagsSlider from "./TagsSlider"

export interface SectionSliderNewCategoriesWagProps {
  className?: string
  categoryCardType?: "card1" | "card2" | "card3" | "card4" | "card5"
  itemPerRow?: 4 | 5
}

export async function SectionSliderNewCategoriesWag({
  className = "",
  itemPerRow = 5,
  categoryCardType = "card5",
}) {
  // const renderCard = (item: TaxonomyType, index: number) => {
  //   const topIndex = index < 3 ? `#${index + 1}` : undefined
  //   switch (categoryCardType) {
  //     case "card1":
  //       return <CardCategory1 key={index} taxonomy={item} />
  //     case "card2":
  //       return <CardCategory2 key={index} index={topIndex} taxonomy={item} />
  //     case "card3":
  //       return <CardCategory3 key={index} taxonomy={item} />
  //     case "card4":
  //       return <CardCategory4 key={index} index={topIndex} taxonomy={item} />
  //     case "card5":
  //       return <CardCategory5 key={index} taxonomy={item} />
  //     default:
  //       return null
  //   }
  // }

  const categories = await getTags()
  const subHeading = `Discover a total of ${categories.length} topics`

  return (
    <div className={`nc-SectionSliderNewCategoriesWag ${className}`}>
      <Heading desc={subHeading}>Top trending topics of the month</Heading>
      <TagsSlider<TagWithCount> data={categories} itemPerRow={itemPerRow} />
    </div>
  )
}

export default SectionSliderNewCategoriesWag
