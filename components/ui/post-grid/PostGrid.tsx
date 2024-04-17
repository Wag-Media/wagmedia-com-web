import React, { FC, ReactNode, Suspense } from "react"
import { getTotalPostCount } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"
import { prisma } from "@/prisma/prisma"
import { ArrowRightIcon } from "lucide-react"

import Button from "@/components/Button/Button"
import ButtonPrimary from "@/components/Button/ButtonPrimary"
import Card11Wag from "@/components/Card11/Card11Wag"
import Heading from "@/components/Heading/Heading"
import Nav from "@/components/Nav/Nav"
import { fetchPosts } from "@/app/actions/fetchPosts"

import { revalidate } from "../../../app/(home)/page"
import { PostGridDisplay } from "./PostGridDisplay"

export interface PostGridProps {
  currentPage?: number
  search?: string
  className?: string
  gridClass?: string
  heading?: ReactNode
  headingIsCenter?: boolean
}

export default async function PostGrid({
  search,
  currentPage = 0,
  className = "",
  gridClass = "",
  heading,
  headingIsCenter,
}: PostGridProps) {
  const posts = await fetchPosts({
    search,
  })
  const totalPostCount = await getTotalPostCount()

  const tabs = ["Latest", "Most Reactions", "Trending"]
  // const [tabActive, setTabActive] = useState<string>(tabs[0])

  // const handleClickTab = (item: string) => {
  //   if (item === tabActive) {
  //     return
  //   }
  //   setTabActive(item)
  // }

  const subHeading = (
    <>
      Discover <span className="font-semibold">{`${totalPostCount}`}</span>{" "}
      Polkadot related posts
    </>
  )

  return (
    <div className={`nc-SectionGridPosts relative ${className}`}>
      <div className="flex justify-between mb-4">
        <Nav
          className="sm:space-x-2 rtl:space-x-reverse"
          containerClassName="relative flex w-full overflow-x-auto text-sm md:text-base"
        >
          {tabs.map((item, index) => (
            // <NavItem key={index}>{item}</NavItem>
            <div className="rounded-full border-2 p-2" key={index}>
              {item}
            </div>
          ))}
        </Nav>
        <Button className="!hidden md:!flex" pattern="white" sizeClass="px-6">
          <span>View all</span>
          <ArrowRightIcon className="ms-3 w-6 h-6 rtl:rotate-180" />
        </Button>
      </div>
      <PostGridDisplay initialPosts={posts} totalPostCount={totalPostCount} />
    </div>
  )
}
