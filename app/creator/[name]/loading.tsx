"use client"

import { useParams } from "next/navigation"

import PostGridSkeleton from "@/components/ui/post-grid/PostGridSkeleton"
import LoadingSpinner from "@/components/Button/Loading"
import Heading from "@/components/Heading/Heading"

export default function Loading() {
  const params = useParams<{ name: string }>()
  if (!params?.name) return "Loading..."

  return (
    <div className={`nc-PageAuthor `}>
      {/* HEADER */}
      <div className="w-full">
        <div className="relative w-full h-40 md:h-60 2xl:h-72"></div>
        <div className="container -mt-10 lg:-mt-16">
          <div className="relative bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-8 rounded-lg md:rounded-[40px] flex flex-col md:flex-row">
            <div className="flex-shrink-0 w-32 mt-12 lg:w-40 sm:mt-0">
              <div className="relative z-0 inline-flex items-center justify-center flex-shrink-0 w-20 h-20 overflow-hidden text-xl font-semibold uppercase rounded-full shadow-2xl wil-avatar text-neutral-100 lg:text-2xl lg:w-36 lg:h-36 ring-4 ring-white dark:ring-0"></div>
            </div>

            {/*  */}
            <div className="flex items-center flex-grow pt-5 md:pt-1 lg:ml-6 xl:ml-12">
              <div className="max-w-screen-sm space-y-3.5 ">
                <h2 className="inline-flex items-center text-2xl font-semibold sm:text-3xl lg:text-4xl">
                  <span>{decodeURIComponent(params.name)}</span>
                  {/* <VerifyIcon
                      className="ml-2"
                      iconClass="w-6 h-6 sm:w-7 sm:h-7 xl:w-8 xl:h-8"
                    /> */}
                </h2>
                <span className="block text-sm text-neutral-500 dark:text-neutral-400"></span>
                <a
                  href="#"
                  className="flex items-center text-xs font-medium space-x-2.5 rtl:space-x-reverse cursor-pointer text-neutral-500 dark:text-neutral-400 truncate"
                >
                  {/* <GlobeAltIcon className="flex-shrink-0 w-4 h-4" />
                    <span className="truncate text-neutral-700 dark:text-neutral-300">
                      https://example.com/me
                    </span> */}
                </a>
                {/* <SocialsList itemClass="block w-7 h-7" /> */}
              </div>
            </div>

            {/*  */}
            <div className="absolute flex justify-end md:static start-5 end-5 top-4 sm:start-auto sm:top-5 sm:end-5">
              {/* <FollowButton
                isFollowing={false}
                fontSize="text-sm md:text-base font-medium"
                sizeClass="px-4 py-1 md:py-2.5 h-8 md:!h-10 sm:px-6 lg:px-8"
              /> */}

              <div className="mx-2">
                {/* <NcDropDown
                  className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full focus:outline-none bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-200"
                  renderTrigger={() => <ShareIcon className="w-5 h-5" />}
                  onClick={() => {}}
                  data={SOCIALS_DATA}
                /> */}
              </div>

              {/* <AccountActionDropdown containerClassName="h-10 w-10 bg-neutral-100 hover:bg-neutral-200 dark:bg-neutral-800 dark:hover:bg-neutral-700" /> */}
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}
      <div className="container py-16 space-y-16 lg:pb-28 lg:pt-20 lg:space-y-28">
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
          <PostGridSkeleton />

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
