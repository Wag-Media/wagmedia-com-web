import React, { FC } from "react"
import Link from "next/link"
import { PostDataType } from "@/data/types"
import { Category } from "@prisma/client"

import Badge from "@/components/Badge/Badge"

export interface CategoryBadgeListWagProps {
  className?: string
  itemClass?: string
  categories: Category[]
}

const CategoryBadgeListWag: FC<CategoryBadgeListWagProps> = ({
  className = "flex flex-wrap gap-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeListWag ${className}`}
      data-nc-id="CategoryBadgeListWag"
    >
      {categories.map((item, index) => (
        <Link href={`/category/${item.name}`} passHref>
          <Badge
            className={itemClass}
            key={index}
            name={item.name}
            // href={item.href}
            // color={item.color as any}
          />
        </Link>
      ))}
    </div>
  )
}

export default CategoryBadgeListWag
