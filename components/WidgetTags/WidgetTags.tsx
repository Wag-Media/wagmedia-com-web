import React, { FC } from "react"
import { TaxonomyType } from "@/data/types"

import Tag from "@/components/Tag/Tag"
import WidgetHeading1 from "@/components/WidgetHeading1/WidgetHeading1"

export interface WidgetTagsProps {
  className?: string
  tags?: TaxonomyType[]
}

const WidgetTags: FC<WidgetTagsProps> = ({
  className = "bg-neutral-100 dark:bg-neutral-800",
  tags = [],
}) => {
  return (
    <div className={`nc-WidgetTags rounded-lg overflow-hidden ${className}`}>
      <WidgetHeading1
        title="💡 More tags"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-wrap p-4 xl:p-5">
        {tags.map((tag) => (
          <Tag className="mb-2 mr-2" key={tag.id} tag={tag} />
        ))}
      </div>
    </div>
  )
}

export default WidgetTags
