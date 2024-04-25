import React, { FC } from "react"
import Link from "next/link"
import { getCategoriesWithPosts } from "@/data/dbCategories"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Badge from "@/components/Badge/Badge"
import Heading from "@/components/Heading/Heading"

import Button from "../Button/Button"
import Card11Wag from "../Card11/Card11Wag"

type expectedCategoryType = Awaited<ReturnType<typeof getCategoriesWithPosts>>

export interface SectionMagazine11Props {
  className?: string
  categories?: expectedCategoryType
  heading?: string
  desc?: string
}

const SectionMagazine11Wag: FC<SectionMagazine11Props> = ({
  categories = [],
  className = "",
  heading = "Explore all Polkadot Article Categories",
  desc = "Polkadot Ecosystem Articles grouped by Category",
}) => {
  const renderListByCat = (category: expectedCategoryType[number]) => {
    const posts = category.posts

    return (
      <div key={category.id} className={`flex flex-col space-y-4`}>
        {category.name && (
          <>
            <h2 className="text-3xl font-bold mb-0">{category.name}</h2>
            <p className="pt-0 mt-0">{`${posts.length} posts`}</p>
          </>
        )}
        {posts[0] && <Card11Wag post={posts[0]} />}
        <ul className="space-y-3">
          {posts
            .filter((_, i) => i > 0 && i < 5)
            .map((post) => (
              <li key={post.id}>
                <h2 className="nc-card-title flex items-start font-medium space-x-4 rtl:space-x-reverse">
                  <Badge
                    className="w-2.5 h-2.5 !p-0 rounded flex-shrink-0 mt-2"
                    name={""}
                    // color={category.color as TwMainColor}
                  />
                  <Link
                    href={`/post/${post.slug}`}
                    title={post.title}
                    className="flex"
                  >
                    {post.title}
                  </Link>
                </h2>
              </li>
            ))}
        </ul>
        <div className="flex items-center justify-between !mt-8 !mb-8">
          <Button href={`/category/${category.name}`}>
            <span>See all {category.name} Articles</span>
            <ArrowRightIcon className="ms-1.5 w-3 h-3" />
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-SectionMagazine11 relative ${className}`}>
      <Heading as="h1" desc={desc}>
        {heading}
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-4 md:gap-7">
        {categories.map((cate, i) => renderListByCat(cate))}
      </div>
    </div>
  )
}

export default SectionMagazine11Wag
