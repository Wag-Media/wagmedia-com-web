import Link from "next/link"
import { prisma } from "@/prisma/prisma"

import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/types/prisma"
import { Ads } from "@/components/ui/ads"
import { PostList } from "@/components/ui/post2/post-list"
import { PostTabs } from "@/components/ui/post/post-tabs"

export const fetchCache = "force-no-store"
export const revalidate = 0 // seconds
export const dynamic = "force-dynamic"

export default async function IndexPage() {
  const posts: PostWithTagsCategoriesReactionsPaymentsUser[] =
    await prisma.post.findMany({
      where: {
        isPublished: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        tags: true,
        categories: {
          include: {
            emoji: true,
          },
        },
        reactions: {
          include: {
            user: true,
            emoji: true,
          },
        },
        payments: true,
        user: true,
      },
    })

  return (
    <>
      <section>
        <Ads />
      </section>
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">
            Wagmedia UI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground">
            Accessible news from the Polkadot ecosystem.
          </p>
        </div>
        <PostTabs />
        <div className="flex gap-4"></div>
      </section>
      <PostList posts={posts} />
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      {/* <test></test> */}
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-end justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Latest from blog
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">
                Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                amet sint. Velit officia consequat duis.
              </p>
            </div>

            <div className="hidden lg:flex lg:items-center lg:space-x-3">
              <button
                type="button"
                className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>

              <button
                type="button"
                className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full">
            <div className="overflow-hidden bg-white rounded shadow">
              <div className="p-5">
                <div className="relative">
                  <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                    <img
                      className="object-cover w-full h-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-1.jpg"
                      alt=""
                    />
                  </a>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {" "}
                      Lifestyle{" "}
                    </span>
                  </div>
                </div>
                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  {" "}
                  March 21, 2020{" "}
                </span>
                <p className="mt-5 text-2xl font-semibold">
                  <a href="#" title="" className="text-black">
                    {" "}
                    How to build coffee inside your home in 5 minutes.{" "}
                  </a>
                </p>
                <p className="mt-4 text-base text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                >
                  Continue Reading
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded shadow">
              <div className="p-5">
                <div className="relative">
                  <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                    <img
                      className="object-cover w-full h-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-2.jpg"
                      alt=""
                    />
                  </a>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {" "}
                      Marketing{" "}
                    </span>
                  </div>
                </div>
                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  {" "}
                  April 04, 2020{" "}
                </span>
                <p className="mt-5 text-2xl font-semibold">
                  <a href="#" title="" className="text-black">
                    {" "}
                    Ho7 Tips to run your remote team faster and better.{" "}
                  </a>
                </p>
                <p className="mt-4 text-base text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                >
                  Continue Reading
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            <div className="overflow-hidden bg-white rounded shadow">
              <div className="p-5">
                <div className="relative">
                  <a href="#" title="" className="block aspect-w-4 aspect-h-3">
                    <img
                      className="object-cover w-full h-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/2/blog-post-3.jpg"
                      alt=""
                    />
                  </a>

                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 text-xs font-semibold tracking-widest text-gray-900 uppercase bg-white rounded-full">
                      {" "}
                      Productivity{" "}
                    </span>
                  </div>
                </div>
                <span className="block mt-6 text-sm font-semibold tracking-widest text-gray-500 uppercase">
                  {" "}
                  May 12, 2020{" "}
                </span>
                <p className="mt-5 text-2xl font-semibold">
                  <a href="#" title="" className="text-black">
                    {" "}
                    5 Productivity tips to write faster at morning.{" "}
                  </a>
                </p>
                <p className="mt-4 text-base text-gray-600">
                  Amet minim mollit non deserunt ullamco est sit aliqua dolor do
                  amet sint. Velit officia consequat duis enim velit mollit.
                </p>
                <a
                  href="#"
                  title=""
                  className="inline-flex items-center justify-center pb-0.5 mt-5 text-base font-semibold text-blue-600 transition-all duration-200 border-b-2 border-transparent hover:border-blue-600 focus:border-blue-600"
                >
                  Continue Reading
                  <svg
                    className="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center mt-8 space-x-3 lg:hidden">
            <button
              type="button"
              className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>

            <button
              type="button"
              className="flex items-center justify-center text-gray-400 transition-all duration-200 bg-transparent border border-gray-300 rounded w-9 h-9 hover:bg-blue-600 hover:text-white focus:bg-blue-600 focus:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>
      </section>
      <section className="py-10 bg-gray-900 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
              Stories from blog
            </h2>
            <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-200">
              Amet minim mollit non deserunt ullamco est sit aliqua dolor do
              amet sint. Velit officia consequat duis.
            </p>
          </div>

          <div className="grid max-w-md grid-cols-1 gap-6 mx-auto mt-8 lg:mt-16 lg:grid-cols-3 lg:max-w-full lg:gap-14">
            <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
              <div className="flex flex-col justify-between flex-1 px-5 py-6">
                <div className="flex-shrink-0">
                  <span className="block text-xs font-semibold tracking-widest text-orange-500 uppercase">
                    {" "}
                    Lifestyle{" "}
                  </span>
                </div>

                <div className="flex-1 mt-28">
                  <p className="text-2xl font-semibold">
                    <a href="#" title="" className="text-black">
                      {" "}
                      Power of habit: How to learn anything in 30 days.{" "}
                    </a>
                  </p>
                  <p className="mt-4 text-base text-gray-600">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="flex">
                  <div className="flex items-center flex-1 px-6 py-5">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-1.jpg"
                      alt=""
                    />
                    <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                      {" "}
                      Wade Warren{" "}
                    </span>
                  </div>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white"
                  >
                    Read more
                    <svg
                      className="w-5 h-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
              <div className="flex flex-col justify-between flex-1 px-5 py-6">
                <div className="flex-shrink-0">
                  <span className="block text-xs font-semibold tracking-widest text-orange-500 uppercase">
                    {" "}
                    Technology{" "}
                  </span>
                </div>

                <div className="flex-1 mt-28">
                  <p className="text-2xl font-semibold">
                    <a href="#" title="" className="text-black">
                      {" "}
                      10 Zoom hacks you can do for productive meetings.{" "}
                    </a>
                  </p>
                  <p className="mt-4 text-base text-gray-600">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="flex">
                  <div className="flex items-center flex-1 px-6 py-5">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-2.jpg"
                      alt=""
                    />
                    <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                      {" "}
                      Leslie Alexander{" "}
                    </span>
                  </div>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white"
                  >
                    Read more
                    <svg
                      className="w-5 h-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col overflow-hidden bg-white shadow-md rounded-xl">
              <div className="flex flex-col justify-between flex-1 px-5 py-6">
                <div className="flex-shrink-0">
                  <span className="block text-xs font-semibold tracking-widest text-orange-500 uppercase">
                    {" "}
                    Marketing{" "}
                  </span>
                </div>

                <div className="flex-1 mt-28">
                  <p className="text-2xl font-semibold">
                    <a href="#" title="" className="text-black">
                      {" "}
                      6 Product launching emails you want to use next.{" "}
                    </a>
                  </p>
                  <p className="mt-4 text-base text-gray-600">
                    Amet minim mollit non deserunt ullamco est sit aliqua dolor
                    do amet sint. Velit officia consequat duis enim velit
                    mollit.
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200">
                <div className="flex">
                  <div className="flex items-center flex-1 px-6 py-5">
                    <img
                      className="object-cover w-8 h-8 rounded-full"
                      src="https://cdn.rareblocks.xyz/collection/celebration/images/blog/3/avatar-3.jpg"
                      alt=""
                    />
                    <span className="flex-1 block min-w-0 ml-3 text-base font-semibold text-gray-900 truncate">
                      {" "}
                      Jenny Wilson{" "}
                    </span>
                  </div>

                  <a
                    href="#"
                    title=""
                    className="inline-flex items-center flex-shrink-0 px-4 py-5 text-base font-semibold transition-all duration-200 bg-white border-l border-gray-200 hover:bg-blue-600 hover:text-white"
                  >
                    Read more
                    <svg
                      className="w-5 h-5 ml-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/720x400"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    The Catalyzer
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/721x401"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    The 400 Blows
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap">
                    <a className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 md:w-1/3">
              <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-lg overflow-hidden">
                <img
                  className="lg:h-48 md:h-36 w-full object-cover object-center"
                  src="https://dummyimage.com/722x402"
                  alt="blog"
                />
                <div className="p-6">
                  <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
                    CATEGORY
                  </h2>
                  <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
                    Shooting Stars
                  </h1>
                  <p className="leading-relaxed mb-3">
                    Photo booth fam kinfolk cold-pressed sriracha leggings
                    jianbing microdosing tousled waistcoat.
                  </p>
                  <div className="flex items-center flex-wrap ">
                    <a className="text-pink-500 inline-flex items-center md:mb-2 lg:mb-0">
                      Learn More
                      <svg
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path d="M5 12h14"></path>
                        <path d="M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                    <span className="text-gray-400 mr-3 inline-flex items-center lg:ml-auto md:ml-0 ml-auto leading-none text-sm pr-3 py-1 border-r-2 border-gray-200">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                        <circle cx="12" cy="12" r="3"></circle>
                      </svg>
                      1.2K
                    </span>
                    <span className="text-gray-400 inline-flex items-center leading-none text-sm">
                      <svg
                        className="w-4 h-4 mr-1"
                        stroke="currentColor"
                        stroke-width="2"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        viewBox="0 0 24 24"
                      >
                        <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                      </svg>
                      6
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="relative py-12 md:py-24 overflow-hidden">
        <img
          className="absolute top-0 left-0 w-full h-full"
          src="casper-assets/blog/bg-gradient-color.png"
          alt=""
        />
        <div className="relative container mx-auto px-4">
          <div className="relative text-center mb-12">
            <span className="block text-lg text-gray-800 tracking-tight mb-6">
              Type Caption Here
            </span>
            <h2 className="font-heading text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-medium text-black tracking-tight mb-6">
              Recent Blog & Articles
            </h2>
          </div>
          <div className="relative max-w-sm md:max-w-6xl mx-auto">
            <div className="border-t-2 border-black border-opacity-10">
              <div className="md:flex items-center -mx-4 py-8">
                <div className="px-4 mb-8 md:mb-0">
                  <img src="casper-assets/blog/image-sm-blog1.png" alt="" />
                </div>
                <div className="px-4 mr-auto mb-8 md:mb-0">
                  <div className="max-w-xl">
                    <span className="block mb-3 text-gray-700 opacity-70">
                      Jul 20, 2022
                    </span>
                    <h4 className="text-2xl font-medium text-black">
                      Consectures Dummy Content Velit officia duis enim velit
                      mollit adipsing
                    </h4>
                  </div>
                </div>
                <div className="px-4 flex-shrink-0">
                  <a className="group flex items-center" href="#">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-700 group-hover:bg-violet-600 group-hover:border-violet-600 transition duration-200">
                      <svg
                        width="24"
                        height="24"
                        viewbox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.92 11.62C17.8724 11.4973 17.801 11.3851 17.71 11.29L12.71 6.29C12.6168 6.19676 12.5061 6.1228 12.3842 6.07234C12.2624 6.02188 12.1319 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29C11.1968 6.38324 11.1228 6.49393 11.0723 6.61575C11.0219 6.73758 10.9959 6.86814 10.9959 7C10.9959 7.2663 11.1017 7.5217 11.29 7.71L14.59 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H14.59L11.29 16.29C11.1963 16.383 11.1219 16.4936 11.0711 16.6154C11.0203 16.7373 10.9942 16.868 10.9942 17C10.9942 17.132 11.0203 17.2627 11.0711 17.3846C11.1219 17.5064 11.1963 17.617 11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5064 17.8781 12.617 17.8037 12.71 17.71L17.71 12.71C17.801 12.6149 17.8724 12.5028 17.92 12.38C18.02 12.1365 18.02 11.8635 17.92 11.62Z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-5 text-sm font-medium text-black">
                      Read more
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-black border-opacity-10">
              <div className="md:flex items-center -mx-4 py-8">
                <div className="px-4 mb-8 md:mb-0">
                  <img src="casper-assets/blog/image-sm-blog2.png" alt="" />
                </div>
                <div className="px-4 mr-auto mb-8 md:mb-0">
                  <div className="max-w-xl">
                    <span className="block mb-3 text-gray-700 opacity-70">
                      Jul 20, 2022
                    </span>
                    <h4 className="text-2xl font-medium text-black">
                      Consectures Dummy Content Velit officia duis enim velit
                      mollit adipsing
                    </h4>
                  </div>
                </div>
                <div className="px-4 flex-shrink-0">
                  <a className="group flex items-center" href="#">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-700 group-hover:bg-violet-600 group-hover:border-violet-600 transition duration-200">
                      <svg
                        width="24"
                        height="24"
                        viewbox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.92 11.62C17.8724 11.4973 17.801 11.3851 17.71 11.29L12.71 6.29C12.6168 6.19676 12.5061 6.1228 12.3842 6.07234C12.2624 6.02188 12.1319 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29C11.1968 6.38324 11.1228 6.49393 11.0723 6.61575C11.0219 6.73758 10.9959 6.86814 10.9959 7C10.9959 7.2663 11.1017 7.5217 11.29 7.71L14.59 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H14.59L11.29 16.29C11.1963 16.383 11.1219 16.4936 11.0711 16.6154C11.0203 16.7373 10.9942 16.868 10.9942 17C10.9942 17.132 11.0203 17.2627 11.0711 17.3846C11.1219 17.5064 11.1963 17.617 11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5064 17.8781 12.617 17.8037 12.71 17.71L17.71 12.71C17.801 12.6149 17.8724 12.5028 17.92 12.38C18.02 12.1365 18.02 11.8635 17.92 11.62Z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-5 text-sm font-medium text-black">
                      Read more
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t-2 border-black border-opacity-10">
              <div className="md:flex items-center -mx-4 py-8">
                <div className="px-4 mb-8 md:mb-0">
                  <img src="casper-assets/blog/image-sm-blog3.png" alt="" />
                </div>
                <div className="px-4 mr-auto mb-8 md:mb-0">
                  <div className="max-w-xl">
                    <span className="block mb-3 text-gray-700 opacity-70">
                      Jul 20, 2022
                    </span>
                    <h4 className="text-2xl font-medium text-black">
                      Consectures Dummy Content Velit officia duis enim velit
                      mollit adipsing
                    </h4>
                  </div>
                </div>
                <div className="px-4 flex-shrink-0">
                  <a className="group flex items-center" href="#">
                    <div className="flex items-center justify-center w-14 h-14 rounded-full border border-gray-700 group-hover:bg-violet-600 group-hover:border-violet-600 transition duration-200">
                      <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M17.92 11.62C17.8724 11.4973 17.801 11.3851 17.71 11.29L12.71 6.29C12.6168 6.19676 12.5061 6.1228 12.3842 6.07234C12.2624 6.02188 12.1319 5.99591 12 5.99591C11.7337 5.99591 11.4783 6.1017 11.29 6.29C11.1968 6.38324 11.1228 6.49393 11.0723 6.61575C11.0219 6.73758 10.9959 6.86814 10.9959 7C10.9959 7.2663 11.1017 7.5217 11.29 7.71L14.59 11H7C6.73478 11 6.48043 11.1054 6.29289 11.2929C6.10536 11.4804 6 11.7348 6 12C6 12.2652 6.10536 12.5196 6.29289 12.7071C6.48043 12.8946 6.73478 13 7 13H14.59L11.29 16.29C11.1963 16.383 11.1219 16.4936 11.0711 16.6154C11.0203 16.7373 10.9942 16.868 10.9942 17C10.9942 17.132 11.0203 17.2627 11.0711 17.3846C11.1219 17.5064 11.1963 17.617 11.29 17.71C11.383 17.8037 11.4936 17.8781 11.6154 17.9289C11.7373 17.9797 11.868 18.0058 12 18.0058C12.132 18.0058 12.2627 17.9797 12.3846 17.9289C12.5064 17.8781 12.617 17.8037 12.71 17.71L17.71 12.71C17.801 12.6149 17.8724 12.5028 17.92 12.38C18.02 12.1365 18.02 11.8635 17.92 11.62Z"
                          fill="black"
                        ></path>
                      </svg>
                    </div>
                    <span className="ml-5 text-sm font-medium text-black">
                      Read more
                    </span>
                  </a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t-2 border-black border-opacity-10 text-center">
              <a
                className="group inline-flex w-full md:w-auto h-14 px-7 items-center justify-center text-base font-medium text-black hover:text-violet-800 bg-violet-500 hover:bg-white transition duration-200 rounded-full"
                href="#"
              >
                <span className="mr-2">SEE MORE ARTICLES</span>
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M17.9199 6.62C17.8185 6.37565 17.6243 6.18147 17.3799 6.08C17.2597 6.02876 17.1306 6.00158 16.9999 6H6.99994C6.73472 6 6.48037 6.10536 6.29283 6.29289C6.1053 6.48043 5.99994 6.73478 5.99994 7C5.99994 7.26522 6.1053 7.51957 6.29283 7.70711C6.48037 7.89464 6.73472 8 6.99994 8H14.5899L6.28994 16.29C6.19621 16.383 6.12182 16.4936 6.07105 16.6154C6.02028 16.7373 5.99414 16.868 5.99414 17C5.99414 17.132 6.02028 17.2627 6.07105 17.3846C6.12182 17.5064 6.19621 17.617 6.28994 17.71C6.3829 17.8037 6.4935 17.8781 6.61536 17.9289C6.73722 17.9797 6.86793 18.0058 6.99994 18.0058C7.13195 18.0058 7.26266 17.9797 7.38452 17.9289C7.50638 17.8781 7.61698 17.8037 7.70994 17.71L15.9999 9.41V17C15.9999 17.2652 16.1053 17.5196 16.2928 17.7071C16.4804 17.8946 16.7347 18 16.9999 18C17.2652 18 17.5195 17.8946 17.707 17.7071C17.8946 17.5196 17.9999 17.2652 17.9999 17V7C17.9984 6.86932 17.9712 6.74022 17.9199 6.62Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="bg-gray-100 text-gray-900">
          <div className="container grid grid-cols-12 mx-auto bg-gray-50">
            <div
              className="bg-no-repeat bg-cover bg-gray-700 col-span-full lg:col-span-4"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/640x480)",
                backgroundPosition: "center center",
                backgroundBlendMode: "multiply",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
              <div className="flex justify-start">
                <span className="px-2 py-1 text-xs rounded-full bg-violet-600 text-gray-50">
                  Label
                </span>
              </div>
              <h1 className="text-3xl font-semibold">Lorem ipsum dolor sit.</h1>
              <p className="flex-1 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                reprehenderit adipisci tempore voluptas laborum quod.
              </p>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-violet-600"
              >
                <span>Read more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">by Leroy Jenkins</span>
                </div>
                <span className="text-xs">3 min read</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 text-gray-900">
          <div className="container grid grid-cols-12 mx-auto bg-gray-50">
            <div
              className="bg-no-repeat bg-cover bg-gray-700 col-span-full lg:col-span-4"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/640x480)",
                backgroundPosition: "center center",
                backgroundBlendMode: "multiply",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
              <div className="flex justify-start">
                <span className="px-2 py-1 text-xs rounded-full bg-violet-600 text-gray-50">
                  Label
                </span>
              </div>
              <h1 className="text-3xl font-semibold">Lorem ipsum dolor sit.</h1>
              <p className="flex-1 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                reprehenderit adipisci tempore voluptas laborum quod.
              </p>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-violet-600"
              >
                <span>Read more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">by Leroy Jenkins</span>
                </div>
                <span className="text-xs">3 min read</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-gray-100 text-gray-900">
          <div className="container grid grid-cols-12 mx-auto bg-gray-50">
            <div
              className="bg-no-repeat bg-cover bg-gray-700 col-span-full lg:col-span-4"
              style={{
                backgroundImage:
                  "url(https://source.unsplash.com/random/640x480)",
                backgroundPosition: "center center",
                backgroundBlendMode: "multiply",
                backgroundSize: "cover",
              }}
            ></div>
            <div className="flex flex-col p-6 col-span-full row-span-full lg:col-span-8 lg:p-10">
              <div className="flex justify-start">
                <span className="px-2 py-1 text-xs rounded-full bg-violet-600 text-gray-50">
                  Label
                </span>
              </div>
              <h1 className="text-3xl font-semibold">Lorem ipsum dolor sit.</h1>
              <p className="flex-1 pt-2">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste,
                reprehenderit adipisci tempore voluptas laborum quod.
              </p>
              <a
                rel="noopener noreferrer"
                href="#"
                className="inline-flex items-center pt-2 pb-6 space-x-2 text-sm text-violet-600"
              >
                <span>Read more</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
              s
              <div className="flex items-center justify-between pt-2">
                <div className="flex space-x-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5 text-gray-600"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="self-center text-sm">by Leroy Jenkins</span>
                </div>
                <span className="text-xs">3 min read</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
