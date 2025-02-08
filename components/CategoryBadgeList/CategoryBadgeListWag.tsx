import React, { FC } from "react"
import Link from "next/link"
import { Category } from "@prisma/client"

import { slugify } from "@/lib/slug"
import Badge from "@/components/Badge/Badge"

export interface CategoryBadgeListWagProps {
  className?: string
  itemClass?: string
  categories: (Category & { slug?: string })[]
}

const CategoryBadgeListWag: FC<CategoryBadgeListWagProps> = ({
  className = "flex flex-wrap gap-[0.15rem]",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeListWag ${className}`}
      data-nc-id="CategoryBadgeListWag"
    >
      {categories.map((item, index) => (
        <Link href={`/category/${slugify(item.name)}`} passHref key={item.name}>
          <Badge
            className={itemClass}
            key={index}
            name={item.name === "Non Anglo" ? "Non-Anglo" : item.name}
            // href={item.href}
            // color={item.color as any}
          />
        </Link>
      ))}
    </div>
  )
}

export default CategoryBadgeListWag
