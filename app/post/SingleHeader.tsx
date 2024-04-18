"use client"

import React, { FC } from "react"
import { DEMO_CATEGORIES } from "@/data/taxonomies"

import CategoryBadgeList from "@/components/CategoryBadgeList/CategoryBadgeList"
import CategoryBadgeListWag from "@/components/CategoryBadgeList/CategoryBadgeListWag"
import PostMeta2 from "@/components/PostMeta2/PostMeta2"

import SingleMetaAction2 from "./SingleMetaAction2"
import SingleTitle from "./SingleTitle"

export interface SingleHeaderProps {
  hiddenDesc?: boolean
  titleMainClass?: string
  className?: string
}

const SingleHeader: FC<SingleHeaderProps> = ({
  titleMainClass,
  hiddenDesc = false,
  className = "",
}) => {
  return (
    <>
      <div className={`nc-SingleHeader ${className}`}>
        <div className="space-y-5">
          <CategoryBadgeListWag
            itemClass="!px-3"
            categories={[DEMO_CATEGORIES[1]]}
          />
          <SingleTitle
            mainClass={titleMainClass}
            title={"Trending web & landing page designs in 2023"}
          />
          {!hiddenDesc && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Perspiciatis tempora obcaecati error ipsum voluptatibus sed
              adipisci ut maiores nesciunt quam.
            </span>
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5 rtl:space-x-reverse">
            <PostMeta2
              size="large"
              className="leading-none flex-shrink-0"
              hiddenCategories
              avatarRounded="rounded-full shadow-inner"
            />
            <SingleMetaAction2 />
          </div>
        </div>
      </div>
    </>
  )
}

export default SingleHeader
