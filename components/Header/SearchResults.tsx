import { FC, Fragment, ReactNode, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { PostWithTagsCategoriesReactionsPaymentsUser } from "@/data/types"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import {
  ClockIcon,
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"
import { Category, User } from "@prisma/client"

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  query: string
  posts: PostWithTagsCategoriesReactionsPaymentsUser[]
  authors: User[]
  categories: Category[]
}

const SearchResults: FC<Props> = ({ query, posts, authors, categories }) => {
  return (
    <>
      <div className="fixed inset-0 z-10 p-4 overflow-y-auto sm:p-6 md:p-20">
        <div
          className="block max-w-2xl mx-auto overflow-hidden transition-all transform bg-white divide-y divide-gray-100 shadow-2xl rounded-xl ring-1 ring-black ring-opacity-5 dark:bg-background"
          onSubmit={(e) => {
            e.preventDefault()
            // router.push("/search")
            // setOpen(false)
          }}
        >
          <Combobox
            //   onChange={(item: any) => {
            //     router.push(item.href)
            //     setOpen(false)
            //   }}
            name="searchpallet"
          >
            <div className="relative">
              <MagnifyingGlassIcon
                className="pointer-events-none absolute top-3.5 left-4 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              <Combobox.Input
                className="w-full h-12 pr-4 text-gray-900 bg-transparent border-0 pl-11 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                placeholder="Search..."
                //   onChange={(event) => setRawQuery(event.target.value)}
              />
            </div>

            {(posts.length > 0 ||
              authors.length > 0 ||
              (posts?.length ?? 0) > 0) && (
              <Combobox.Options
                static
                className="p-4 pb-2 space-y-4 overflow-y-auto max-h-80 scroll-py-10 scroll-pb-2"
              >
                {(posts?.length ?? 0) > 0 && (
                  <li>
                    <h2 className="text-xs font-semibold text-gray-900">
                      Posts
                    </h2>
                    <ul className="mt-2 -mx-4 text-sm text-gray-700">
                      {(posts ?? []).map((post) => (
                        <Combobox.Option
                          key={post.id}
                          value={post}
                          className={({ active }) =>
                            classNames(
                              "flex select-none items-center px-4 py-2",
                              active && "bg-indigo-600 text-white"
                            )
                          }
                        >
                          {({ active }) => (
                            <>
                              <ClockIcon
                                className={classNames(
                                  "h-6 w-6 flex-none",
                                  active ? "text-white" : "text-gray-400"
                                )}
                                aria-hidden="true"
                              />
                              <span className="flex-auto truncate ms-3">
                                {post.title}
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                )}

                {posts.length > 0 && (
                  <li>
                    <h2 className="text-xs font-semibold text-gray-900">
                      Categories
                    </h2>
                    <ul className="mt-2 -mx-4 text-sm text-gray-700">
                      {posts.map((post) => (
                        <Combobox.Option
                          key={post.id}
                          value={post}
                          className={({ active }) =>
                            classNames(
                              "flex select-none items-center px-4 py-2",
                              active && "bg-indigo-600 text-white"
                            )
                          }
                        >
                          {({ active }) => (
                            <>
                              <HashtagIcon
                                className={classNames(
                                  "h-6 w-6 flex-none",
                                  active ? "text-white" : "text-gray-400"
                                )}
                                aria-hidden="true"
                              />
                              <span className="flex-auto truncate ms-3">
                                {post.title}
                              </span>
                            </>
                          )}
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                )}

                {authors.length > 0 && (
                  <li>
                    <h2 className="text-xs font-semibold text-gray-900">
                      Authors
                    </h2>
                    <ul className="mt-2 -mx-4 text-sm text-gray-700">
                      {authors.map((user) => (
                        <Combobox.Option
                          key={user.id}
                          value={user}
                          className={({ active }) =>
                            classNames(
                              "flex select-none items-center px-4 py-2",
                              active && "bg-indigo-600 text-white"
                            )
                          }
                        >
                          <Image
                            src={user.avatar ?? ""}
                            alt="author"
                            className="flex-none w-6 h-6 rounded-full"
                            sizes="30px"
                          />
                          <span className="flex-auto truncate ms-3">
                            {user.name}
                          </span>
                        </Combobox.Option>
                      ))}
                    </ul>
                  </li>
                )}
              </Combobox.Options>
            )}

            {query === "?" && (
              <div className="px-6 text-sm text-center py-14 sm:px-14">
                <LifebuoyIcon
                  className="w-6 h-6 mx-auto text-gray-400"
                  aria-hidden="true"
                />
                <p className="mt-4 font-semibold text-gray-900">
                  Help with searching
                </p>
                <p className="mt-2 text-gray-500">
                  Use this tool to quickly search for users and projects across
                  our entire platform. You can also use the search modifiers
                  found in the footer below to limit the results to just users
                  or projects.
                </p>
              </div>
            )}

            {query !== "" &&
              query !== "?" &&
              posts.length === 0 &&
              authors.length === 0 && (
                <div className="px-6 text-sm text-center py-14 sm:px-14">
                  <ExclamationTriangleIcon
                    className="w-6 h-6 mx-auto text-gray-400"
                    aria-hidden="true"
                  />
                  <p className="mt-4 font-semibold text-gray-900">
                    No results found
                  </p>
                  <p className="mt-2 text-gray-500">
                    We couldn’t find anything with that term. Please try again.
                  </p>
                </div>
              )}

            <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
              Type{" "}
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  query.startsWith("#")
                    ? "border-indigo-600 text-indigo-600"
                    : "border-gray-400 text-gray-900"
                )}
              >
                #
              </kbd>{" "}
              <span className="sm:hidden">for projects,</span>
              <span className="hidden sm:inline">to access projects,</span>
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  query.startsWith(">")
                    ? "border-indigo-600 text-indigo-600"
                    : "border-gray-400 text-gray-900"
                )}
              >
                &gt;
              </kbd>{" "}
              for users,{" "}
              <kbd
                className={classNames(
                  "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                  query === "?"
                    ? "border-indigo-600 text-indigo-600"
                    : "border-gray-400 text-gray-900"
                )}
              >
                ?
              </kbd>{" "}
              for help, or{" "}
              <Link
                href={"/search"}
                className="mx-1 flex h-5 px-1.5 items-center justify-center rounded border bg-white sm:mx-2 border-primary-6000 text-neutral-900"
                //   onClick={() => setOpen(false)}
              >
                Go to search page
              </Link>{" "}
            </div>
          </Combobox>
        </div>
      </div>
    </>
  )
}

export default SearchResults
