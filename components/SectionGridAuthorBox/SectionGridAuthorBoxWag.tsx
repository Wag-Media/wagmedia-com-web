import React, { FC } from "react"
import { PostAuthorType, UserWithPosts } from "@/data/types"

import CardAuthorBox from "@/components/CardAuthorBox/CardAuthorBox"
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
      <Heading desc="Rating based on earnings" isCenter>
        Top authors of the year
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-8 ">
        {authors.map((author) => (
          <CardAuthorBoxWag key={author.id} author={author} />
        ))}
      </div>
    </div>
  )
}

export default SectionGridAuthorBoxWag
