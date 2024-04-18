import React, { ReactNode } from "react"

import SingleContent from "./SingleContent"
import SingleHeader from "./SingleHeader"
import SingleRelatedPosts from "./SingleRelatedPosts"

const layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className={`nc-PageSingle pt-8 lg:pt-16`}>
      {/* SINGLE MAIN CONTENT */}
      <SingleContent>{children}</SingleContent>

      {/* RELATED POSTS */}
      <SingleRelatedPosts />
    </div>
  )
}

export default layout
