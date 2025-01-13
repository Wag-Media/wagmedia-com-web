"use client"

import { FC, Fragment, ReactNode, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { DEMO_AUTHORS } from "@/data/authors"
import { DEMO_POSTS } from "@/data/posts"
import { DEMO_CATEGORIES } from "@/data/taxonomies"
import { Combobox, Dialog, Transition } from "@headlessui/react"
import {
  ClockIcon,
  ExclamationTriangleIcon,
  HashtagIcon,
  LifebuoyIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline"

import { usePosts } from "@/hooks/usePosts"

const categories = DEMO_CATEGORIES.filter((_, i) => i < 9)
const authors = DEMO_AUTHORS.filter((_, i) => i < 9)

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ")
}

interface Props {
  renderTrigger?: () => ReactNode
}

const SearchModal: FC<Props> = ({ renderTrigger }) => {
  const [open, setOpen] = useState(false)
  const [rawQuery, setRawQuery] = useState("a")

  const router = useRouter()

  const query = rawQuery.toLowerCase().replace(/^[#>]/, "")

  const { data: posts, isLoading: isPostsLoading } = usePosts(query)

  const filteredPosts =
    rawQuery === "#"
      ? posts
      : query === "" || rawQuery.startsWith(">")
      ? []
      : posts?.filter((post) => post.title.toLowerCase().includes(query))

  const filteredProjects =
    rawQuery === "#"
      ? categories
      : query === "" || rawQuery.startsWith(">")
      ? []
      : categories.filter((project) =>
          project.name.toLowerCase().includes(query)
        )

  const filteredUsers =
    rawQuery === ">"
      ? authors
      : query === "" || rawQuery.startsWith("#")
      ? []
      : authors.filter((user) => user.displayName.toLowerCase().includes(query))

  return (
    <>
      <button
        className="flex items-center self-center justify-center w-12 h-12 text-2xl rounded-full text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl backdrop-blur-md"
        onClick={() => setOpen(true)}
      >
        <svg
          width={18}
          height={18}
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M22 22L20 20"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <Transition.Root
        show={open}
        as={Fragment}
        afterLeave={() => setRawQuery("a")}
        appear
      >
        <Dialog
          as="div"
          className="relative z-[99]"
          onClose={() => setOpen(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 transition-opacity bg-black/40" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 p-4 overflow-y-auto sm:p-6 md:p-20">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-100"
            >
              <Dialog.Panel
                className="block max-w-2xl mx-auto overflow-hidden transition-all transform bg-white divide-y divide-gray-100 shadow-2xl rounded-xl ring-1 ring-black ring-opacity-5 dark:bg-background"
                as="form"
                onSubmit={(e) => {
                  e.preventDefault()
                  router.push("/search")
                  setOpen(false)
                }}
              >
                {isPostsLoading && <div>Loading...</div>}
                posts:{!isPostsLoading && <>{JSON.stringify(posts)}</>}
                <Combobox
                  onChange={(item: any) => {
                    router.push(item.href)
                    setOpen(false)
                  }}
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
                      onChange={(event) => setRawQuery(event.target.value)}
                    />
                  </div>

                  {(filteredProjects.length > 0 ||
                    filteredUsers.length > 0 ||
                    (filteredPosts?.length ?? 0) > 0) && (
                    <Combobox.Options
                      static
                      className="p-4 pb-2 space-y-4 overflow-y-auto max-h-80 scroll-py-10 scroll-pb-2"
                    >
                      {(filteredPosts?.length ?? 0) > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Posts
                          </h2>
                          <ul className="mt-2 -mx-4 text-sm text-gray-700">
                            {(filteredPosts ?? []).map((post) => (
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

                      {filteredProjects.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Categories
                          </h2>
                          <ul className="mt-2 -mx-4 text-sm text-gray-700">
                            {filteredProjects.map((project) => (
                              <Combobox.Option
                                key={project.id}
                                value={project}
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
                                      {project.name}
                                    </span>
                                  </>
                                )}
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}

                      {filteredUsers.length > 0 && (
                        <li>
                          <h2 className="text-xs font-semibold text-gray-900">
                            Authors
                          </h2>
                          <ul className="mt-2 -mx-4 text-sm text-gray-700">
                            {filteredUsers.map((user) => (
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
                                  src={user.avatar}
                                  alt="author"
                                  className="flex-none w-6 h-6 rounded-full"
                                  sizes="30px"
                                />
                                <span className="flex-auto truncate ms-3">
                                  {user.displayName}
                                </span>
                              </Combobox.Option>
                            ))}
                          </ul>
                        </li>
                      )}
                    </Combobox.Options>
                  )}

                  {rawQuery === "?" && (
                    <div className="px-6 text-sm text-center py-14 sm:px-14">
                      <LifebuoyIcon
                        className="w-6 h-6 mx-auto text-gray-400"
                        aria-hidden="true"
                      />
                      <p className="mt-4 font-semibold text-gray-900">
                        Help with searching
                      </p>
                      <p className="mt-2 text-gray-500">
                        Use this tool to quickly search for users and projects
                        across our entire platform. You can also use the search
                        modifiers found in the footer below to limit the results
                        to just users or projects.
                      </p>
                    </div>
                  )}

                  {query !== "" &&
                    rawQuery !== "?" &&
                    filteredProjects.length === 0 &&
                    filteredUsers.length === 0 && (
                      <div className="px-6 text-sm text-center py-14 sm:px-14">
                        <ExclamationTriangleIcon
                          className="w-6 h-6 mx-auto text-gray-400"
                          aria-hidden="true"
                        />
                        <p className="mt-4 font-semibold text-gray-900">
                          No results found
                        </p>
                        <p className="mt-2 text-gray-500">
                          We couldn’t find anything with that term. Please try
                          again.
                        </p>
                      </div>
                    )}

                  <div className="flex flex-wrap items-center bg-gray-50 py-2.5 px-4 text-xs text-gray-700">
                    Type{" "}
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith("#")
                          ? "border-indigo-600 text-indigo-600"
                          : "border-gray-400 text-gray-900"
                      )}
                    >
                      #
                    </kbd>{" "}
                    <span className="sm:hidden">for projects,</span>
                    <span className="hidden sm:inline">
                      to access projects,
                    </span>
                    <kbd
                      className={classNames(
                        "mx-1 flex h-5 w-5 items-center justify-center rounded border bg-white font-semibold sm:mx-2",
                        rawQuery.startsWith(">")
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
                        rawQuery === "?"
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
                      onClick={() => setOpen(false)}
                    >
                      Go to search page
                    </Link>{" "}
                  </div>
                </Combobox>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}

export default SearchModal
