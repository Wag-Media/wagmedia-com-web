"use client"

import React, { FC, ReactNode, useState } from "react"
import { DEMO_POSTS } from "@/data/posts"
// import Card15Podcast from "@/components/Card15Podcast/Card15Podcast";
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"
import { ArrowRightIcon } from "lucide-react"

import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Card3 from "@/components/Card3/Card3"
import Card4 from "@/components/Card4/Card4"
import Card7 from "@/components/Card7/Card7"
import Card9 from "@/components/Card9/Card9"
import Card10 from "@/components/Card10/Card10"
import Card10V2 from "@/components/Card10/Card10V2"
import Card11 from "@/components/Card11/Card11"
import Card14 from "@/components/Card14/Card14"
import Heading from "@/components/Heading/Heading"

import Button from "../Button/Button"
import Card11Wag from "../Card11/Card11Wag"
import Nav from "../Nav/Nav"
import NavItem from "../NavItem/NavItem"

export interface SectionGridWagPostsProps {
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
  className?: string
  gridClass?: string
  heading?: ReactNode
  subHeading?: ReactNode
  headingIsCenter?: boolean
  postCardName?:
    | "card3"
    | "card4"
    | "card7"
    | "card9"
    | "card10"
    | "card10V2"
    | "card11"
    | "card14"
    | "card15Podcast"
}

const SectionGridWagPosts: FC<SectionGridWagPostsProps> = ({
  posts,
  postCardName = "card3",
  className = "",
  gridClass = "",
  heading,
  subHeading,
  headingIsCenter,
}) => {
  const renderCard = (post: PostWithTagsCategoriesReactionsPaymentsUser) => {
    return <Card11Wag key={post.id} post={post} />
    // switch (postCardName) {
    //   case "card3":
    //     return (
    //       <Card3
    //         key={post.id}
    //         className="p-3 sm:p-5 2xl:p-6 [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ]"
    //         post={post}
    //       />
    //     );
    //   case "card4":
    //     return <Card4 key={post.id} post={post} />;
    //   case "card7":
    //     return (
    //       <Card7 key={post.id} post={post} ratio="aspect-w-5 aspect-h-5" />
    //     );
    //   case "card9":
    //     return <Card9 key={post.id} post={post} />;
    //   case "card10":
    //     return <Card10 key={post.id} post={post} />;
    //   case "card10V2":
    //     return <Card10V2 key={post.id} post={post} />;
    //   case "card11":
    //     return <Card11 key={post.id} post={post} />;
    //   case "card14":
    //     return <Card14 key={post.id} post={post} />;
    //   case "card15Podcast":
    //     return <Card15Podcast key={post.id} post={post} />;
    //   default:
    //     return null;
    // }
  }

  const tabs = ["Latest", "Most Reactions", "Trending"]
  const [tabActive, setTabActive] = useState<string>(tabs[0])

  const handleClickTab = (item: string) => {
    if (item === tabActive) {
      return
    }
    setTabActive(item)
  }

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <Heading desc={subHeading} isCenter={headingIsCenter} className="mb-8">
        {heading}
      </Heading>
      <div className="flex justify-between mb-4">
        <Nav
          className="sm:space-x-2 rtl:space-x-reverse"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            <NavItem
              key={index}
              isActive={tabActive === item}
              onClick={() => handleClickTab(item)}
            >
              {item}
            </NavItem>
          ))}
        </Nav>
        <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6">
          <span>View all</span>
          <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
        </Button>
      </div>
      <div className={`grid gap-6 md:gap-8 ${gridClass}`}>
        {posts.map((post) => renderCard(post))}
      </div>
      <div className="flex mt-20 justify-center items-center">
        <ButtonPrimary>Show me more</ButtonPrimary>
      </div>
    </div>
  )
}

export default SectionGridWagPosts
