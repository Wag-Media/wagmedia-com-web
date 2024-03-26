import React, { FC } from "react"
import Link from "next/link"
import { getCategoriesWithPosts } from "@/data/dbCategories"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Badge from "@/components/Badge/Badge"
import Heading from "@/components/Heading/Heading"

import Card11Wag from "../Card11/Card11Wag"

type expectedCategoryType = Awaited<ReturnType<typeof getCategoriesWithPosts>>

export interface SectionMagazine11Props {
  className?: string
  categories?: expectedCategoryType
}

const SectionMagazine11Wag: FC<SectionMagazine11Props> = ({
  categories = [],
  className = "",
}) => {
  const renderListByCat = (category: expectedCategoryType[number]) => {
    const posts = category.posts

    return (
      <div key={category.id} className={`flex flex-col space-y-4`}>
        {category.name && (
          <Heading desc={`${posts.length} posts`} className="mb-0">
            {category.name}
          </Heading>
        )}
        {posts[0] && <Card11Wag post={posts[0]} />}
        <ul className="space-y-3">
          {posts
            .filter((_, i) => i > 0 && i < 4)
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
        <div className="flex items-center justify-between">
          <a
            href={`/category/${category.name}`}
            className="flex items-center text-neutral-500"
          >
            <span>See all {category.name} Articles</span>
            <ArrowRightIcon className="ms-1.5 w-3 h-3" />
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className={`nc-SectionMagazine11 relative ${className}`}>
      <Heading as="h1" desc={"Polkadot Ecosystem Posts grouped by Category"}>
        Explore all Polkadot News Categories
      </Heading>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 sm:gap-4 md:gap-7">
        {categories.map((cate, i) => renderListByCat(cate))}
      </div>
    </div>
  )
}

export default SectionMagazine11Wag
