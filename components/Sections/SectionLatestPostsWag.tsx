import React, { FC } from "react"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Heading from "@/components/Heading/Heading"
import Pagination from "@/components/Pagination/Pagination"
// import WidgetAuthors from "@/components/WidgetAuthors/WidgetAuthors"
import WidgetCategories from "@/components/WidgetCategories/WidgetCategories"
// import WidgetPosts from "@/components/WidgetPosts/WidgetPosts"
import WidgetTags from "@/components/WidgetTags/WidgetTags"

import Card11Wag from "../Card11/Card11Wag"

// THIS IS DEMO FOR MAIN DEMO
// OTHER DEMO WILL PASS PROPS
//
export interface SectionLatestWagPostsProps {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
  gridClass?: string
  className?: string
  heading?: string
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card11"
    | "card14"
}

const SectionLatestWagPosts: FC<SectionLatestWagPostsProps> = ({
  posts,
  postCardName = "card3",
  heading = "Latest Articles 🎈",
  gridClass = "",
  className = "",
}) => {
  const renderCard = (
    post: PostWithTagsCategoriesReactionsPaymentsUser,
    index: number
  ) => {
    return <Card11Wag key={index} post={post} />
    // switch (postCardName) {
    //   case "card3":
    //     return (
    //       // <Card3 key={index} className="p-3 sm:p-5 2xl:p-6 " post={post} />
    //       <Card3 key={index} className="py-3" post={post} />
    //     );
    //   case "card4":
    //     return <Card4 key={index} post={post} />;
    //   case "card7":
    //     return <Card7 key={index} post={post} ratio="aspect-w-5 aspect-h-5" />;
    //   case "card9":
    //     return <Card9 key={index} post={post} />;
    //   case "card10":
    //     return <Card10 key={index} post={post} />;
    //   case "card11":
    //     return <Card11 key={index} post={post} />;
    //   case "card14":
    //     return <Card14 key={index} post={post} />;
    //   default:
    //     return null;
    // }
  }

  return (
    <div className={`nc-SectionLatestWagPosts relative ${className}`}>
      <div className="flex flex-col lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 xl:pe-14">
          <Heading>{heading}</Heading>
          <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
            {posts.map(renderCard)}
          </div>
          <div className="flex flex-col mt-12 space-y-5 md:mt-20 sm:space-y-0 sm:space-x-3 rtl:space-x-reverse sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>
        <div className="w-full mt-24 space-y-7 lg:mt-0 lg:w-2/5 lg:ps-10 xl:ps-0 xl:w-1/3 ">
          <WidgetTags />
          <WidgetCategories />
          {/* <WidgetAuthors /> */}
          {/* <WidgetPosts /> */}
        </div>
      </div>
    </div>
  )
}

export default SectionLatestWagPosts
