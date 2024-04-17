"use client"

import { useState } from "react"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import CardLarge1Wag from "@/components/CardLarge1/CardLarge1Wag"

export function SliderDisplay({
  posts,
}: {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}) {
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
    <>
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
    </>
  )
}
