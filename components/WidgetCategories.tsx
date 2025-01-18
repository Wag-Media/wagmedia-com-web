import React, { FC } from "react"
import { CategoryWithCount } from "@/data/types"

import CardCategory1 from "@/components/CardCategory1/CardCategory1"
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1"

const categoriesDemo: CategoryWithCount[] = []

export interface WidgetCategoriesProps {
  className?: string
  categories?: CategoryWithCount[]
}

const WidgetCategories: FC<WidgetCategoriesProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  categories = categoriesDemo,
}) => {
  return (
    <div
      className={`nc-WidgetCategories rounded-lg  overflow-hidden ${className}`}
    >
      <WidgetHeading1
        title="✨ Trending topic"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flow-root">
        <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700">
          {categories.map((category) => (
            <CardCategory1
              className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
              key={category.id}
              category={category}
              size="normal"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default WidgetCategories
