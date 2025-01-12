import React from "react"
import Image from "next/image"
import Link from "next/link"
import { getAuthor } from "@/data/dbAuthors"
import { getPostsByAuthor } from "@/data/dbPosts"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"
import { User } from "@prisma/client"
import { Globe, TwitterIcon } from "lucide-react"

import Card11Wag from "@/components/Card11/Card11Wag"
import NcImage from "@/components/NcImage/NcImage"

export async function AuthorPage({
  author,
  posts,
}: {
  author: User
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
}) {
  // const TABS = ["Articles", "Favorites", "Saved"]

  if (!author) {
    return <div>Creator not found</div>
  }

  return (
    <div className={`nc-PageAuthor `}>
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 2xl:h-60">
          {author?.banner ? (
            <NcImage
              alt=""
              containerClassName="absolute inset-0"
              sizes="(max-width: 1280px) 100vw, 1536px"
              src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
              className="object-cover w-full h-full"
              fill
              priority
            />
          ) : (
            <div
              className={`absolute w-full h-full`}
              style={{ background: author?.accentColor ?? "transparent" }}
            />
          )}
        </div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative flex flex-col p-5 bg-white border rounded-md dark:bg-neutral-900 dark:border-neutral-700 lg:p-8 md:rounded-xl md:flex-row">
            <div className="flex-shrink-0 w-32 mt-12 lg:w-40 sm:mt-0">
              <div className="relative z-0 inline-flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden text-xl font-semibold uppercase rounded-full shadow-2xl wil-avatar text-neutral-100 lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0">
                {author?.avatar && (
                  <Image
                    alt="Avatar"
                    src={author.avatar}
                    fill
                    className="object-cover"
                    priority={true}
                  />
                )}
              </div>
            </div>
            <div className="flex items-center flex-grow pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="max-w-screen-sm space-y-3.5 ">
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  WagMedia Creator
                </span>
                <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  <span>{author?.name}</span>
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400">
                  {posts.length} published posts
                </span>
                <p className="block text-md">{author?.bio}</p>

                {author?.domain && (
                  <Link
                    href={author.domain}
                    className="flex flex-row items-center"
                  >
                    <Globe className="flex-shrink-0 w-4 h-4 mr-2" />
                    <span className="truncate text-neutral-700 dark:text-neutral-300">
                      {author.domain}
                    </span>
                  </Link>
                )}
                {author?.twitterUsername && (
                  <Link
                    href={`https://x.com/${author?.twitterUsername}`}
                    className="flex flex-row items-center"
                  >
                    <TwitterIcon className="flex-shrink-0 w-4 h-4 mr-2" />
                    <span className="truncate text-neutral-700 dark:text-neutral-300">
                      {author.twitterUsername}
                    </span>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}
      <div className="container py-8 space-y-8 lg:pb-28 lg:pt-8 lg:space-y-8">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            {/* <Nav className="sm:space-x-2 rtl:space-x-reverse">
            {TABS.map((item, index) => (
              <NavItem
                key={index}
                isActive={tabActive === item}
                onClick={() => handleClickTab(item)}
              >
                {item}
              </NavItem>
            ))}
          </Nav> */}
            <div className="block w-full my-4 border-b border-neutral-300 dark:border-neutral-500 sm:hidden"></div>
            {/* <div className="flex justify-end">
              <ArchiveFilterListBox lists={FILTERS} />
            </div> */}
          </div>

          {/* LOOP ITEMS */}
          <div className="grid gap-6 mt-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 lg:mt-10">
            {posts?.map((post, index) => (
              <Card11Wag key={index} post={post} />
              // <>{JSON.stringify(post, null, 2)}</>
            ))}
          </div>

          {/* PAGINATION */}
          {/* <div className="flex flex-col mt-12 space-y-5 lg:mt-16 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination /> */}
          {/* <ButtonPrimary>Show me more</ButtonPrimary> */}
          {/* </div> */}
        </main>

        {/* === SECTION 5 === */}
        {/* <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="mx-auto mt-10 text-center md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div> */}

        {/* === SECTION 5 === */}
        {/* <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        /> */}

        {/* SUBCRIBES */}
        {/* <SectionSubscribe2 /> */}
      </div>
    </div>
  )
}
