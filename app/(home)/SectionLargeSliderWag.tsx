"use client"

import React, { FC, useState } from "react"
import {
  PostDataType,
  PostWithTagsCategoriesReactionsPaymentsUser,
} from "@/data/types"

import CardLarge1 from "@/components/CardLarge1/CardLarge1"
import CardLarge1Wag from "@/components/CardLarge1/CardLarge1Wag"
import Heading from "@/components/Heading/Heading"

export interface SectionLargeSliderWagProps {
  className?: string
  heading?: string
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}

const SectionLargeSliderWag: FC<SectionLargeSliderWagProps> = ({
  posts,
  heading = "Decentralized Media, Collective Impact",
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0)

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= posts.length - 1) {
        return 0
      }
      return state + 1
    })
  }

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return posts.length - 1
      }
      return state - 1
    })
  }

  return (
    <div className={`nc-SectionLargeSliderWag relative ${className}`}>
      {!!heading && (
        <Heading
          desc="WagMedia is collectively shaping the Future of Blockchain Media Creation on
              Polkadot and Kusama"
        >
          {heading}
        </Heading>
      )}
      {posts.map((item, index) => {
        if (indexActive !== index) return null
        return (
          <CardLarge1Wag
            key={index}
            onClickNext={handleClickNext}
            onClickPrev={handleClickPrev}
            post={item}
          />
        )
      })}
    </div>
  )
}

export default SectionLargeSliderWag
