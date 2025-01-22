import React, { FC } from "react"
import { UserWithPosts } from "@/data/types"

import Heading from "@/components/Heading/Heading"

import CardAuthorBoxWag from "../CardAuthorBox/CardAuthorBoxWag"

export interface SectionGridAuthorBoxProps {
  className?: string
  authors: UserWithPosts[]
}

const SectionGridAuthorBoxWag: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors,
}) => {
  return (
    <div className={`nc-SectionGridAuthorBox relative ${className}`}>
      <h2 className="mb-8 text-3xl font-bold text-center text-gray-900 dark:text-white">
        Top WagMedia Content Creators
      </h2>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 md:gap-4 ">
        {authors.map((author) => (
          <CardAuthorBoxWag key={author.id} author={author} />
        ))}
      </div>
    </div>
  )
}

export default SectionGridAuthorBoxWag
