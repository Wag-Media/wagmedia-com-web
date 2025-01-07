"use client"

import React, { FC, Fragment, useState } from "react"
import Link from "next/link"
import { Route } from "@/routers/types"
import { ChevronDownIcon } from "@heroicons/react/24/solid"

import { Popover, Transition } from "@/app/headlessui"

import { cn } from "../../lib/utils"
import NcImage from "../NcImage/NcImage"

export interface NavItemType {
  id: string
  name: string
  href: Route
  targetBlank?: boolean
  children?: NavItemType[]
  type?: "dropdown" | "megaMenu" | "none"
  isNew?: boolean
  active?: boolean
}

export interface NavigationItemProps {
  menuItem: NavItemType
  active?: boolean
}

const recentPosts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "/single-gallery/demo-slug",
    date: "Mar 16, 2023",
    datetime: "2023-03-16",
    category: { title: "Marketing", href: "/archive/demo-slug" },
    imageUrl:
      "https://images.unsplash.com/photo-1678720175173-f57e293022e4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MjJ8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Et et dolore officia quis nostrud esse aute cillum irure do esse. Eiusmod ad deserunt cupidatat est magna Lorem.",
  },
  {
    id: 2,
    title: "How to use search engine optimization to drive sales",
    href: "/single-gallery/demo-slug",
    date: "Mar 10, 2023",
    datetime: "2023-03-10",
    category: { title: "Sales", href: "/archive/demo-slug" },
    imageUrl:
      "https://images.unsplash.com/photo-1678846912726-667eda5a850f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyODh8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
    description:
      "Optio cum necessitatibus dolor voluptatum provident commodi et.",
  },
]

const NavigationItem: FC<NavigationItemProps> = ({ menuItem, active }) => {
  const [menuCurrentHovers, setMenuCurrentHovers] = useState<string[]>([])

  const onMouseEnterMenu = (id: string) => {
    setMenuCurrentHovers((state) => [...state, id])
  }

  const onMouseLeaveMenu = (id: string) => {
    setMenuCurrentHovers((state) => {
      return state.filter((item, index) => {
        return item !== id && index < state.indexOf(id)
      })
    })
  }

  // ===================== MENU MEGAMENU =====================
  const renderMegaMenu = (menu: NavItemType) => {
    if (!menu.children) {
      return null
    }

    return (
      <li
        className={`menu-item flex-shrink-0 menu-megamenu menu-megamenu--large`}
      >
        {renderMainItem(menu)}

        <div className="absolute inset-x-0 z-50 invisible transform sub-menu top-full">
          <div className="bg-white shadow-lg dark:bg-neutral-900">
            <div className="container">
              <div className="flex text-sm border-t border-slate-200 dark:border-slate-700 py-14">
                <div className="grid flex-1 grid-cols-4 gap-6 pr-6 xl:pr-8">
                  {menu.children.map((item, index) => (
                    <div key={index}>
                      <p className="font-medium text-slate-900 dark:text-neutral-200">
                        {item.name}
                      </p>
                      <ul className="grid mt-4 space-y-4">
                        {item.children?.map(renderMegaMenuNavlink)}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="w-[40%] ">
                  <div className="grid grid-cols-1 gap-10 sm:gap-8 lg:grid-cols-2">
                    <h3 className="sr-only">Recent posts</h3>
                    {recentPosts.map((post) => (
                      <article
                        key={post.id}
                        className="relative flex flex-col max-w-2xl isolate gap-x-8 gap-y-6 sm:flex-row sm:items-start lg:flex-col lg:items-stretch"
                      >
                        <div className="relative flex-none">
                          <NcImage
                            containerClassName="aspect-[2/1] w-full rounded-xl bg-gray-100 sm:aspect-[16/9] sm:h-32 lg:h-auto z-0"
                            fill
                            className="object-cover rounded-xl"
                            src={post.imageUrl}
                            sizes="300px"
                            alt=""
                          />
                          <div className="absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" />
                        </div>
                        <div>
                          <div className="flex items-center gap-x-4">
                            <time
                              dateTime={post.datetime}
                              className="text-sm leading-6 text-gray-600"
                            >
                              {post.date}
                            </time>
                            <Link
                              href={post.category.href as Route}
                              className="relative z-10 rounded-full bg-gray-50 py-1.5 px-3 text-xs font-medium text-gray-600 hover:bg-gray-100"
                            >
                              {post.category.title}
                            </Link>
                          </div>
                          <h4 className="mt-2 text-sm font-semibold leading-6 text-gray-900">
                            <Link href={post.href as Route}>
                              <span className="absolute inset-0" />
                              {post.title}
                            </Link>
                          </h4>
                          <p className="mt-2 text-sm leading-6 text-gray-600">
                            {post.description}
                          </p>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </li>
    )
  }

  const renderMegaMenuNavlink = (item: NavItemType) => {
    return (
      <li key={item.id} className={`${item.isNew ? "menuIsNew" : ""}`}>
        <Link
          className="font-normal text-slate-600 hover:text-black dark:text-slate-400 dark:hover:text-white "
          href={{
            pathname: item.href || undefined,
          }}
        >
          {item.name}
        </Link>
      </li>
    )
  }

  // ===================== MENU DROPDOW =====================
  const renderDropdownMenu = (menuDropdown: NavItemType) => {
    const isHover = menuCurrentHovers.includes(menuDropdown.id)
    return (
      <Popover
        as="li"
        className="relative menu-item menu-dropdown"
        onMouseEnter={() => onMouseEnterMenu(menuDropdown.id)}
        onMouseLeave={() => onMouseLeaveMenu(menuDropdown.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderMainItem(menuDropdown)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute left-0 z-10 w-56 transform sub-menu top-full"
              >
                <ul className="relative grid py-4 space-y-1 text-sm shadow-lg rounded-2xl ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 dark:bg-neutral-900">
                  {menuDropdown.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i)
                    } else {
                      return (
                        <li
                          key={i.id}
                          className={`px-2 ${i.isNew ? "menuIsNew" : ""}`}
                        >
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      )
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderDropdownMenuNavlinkHasChild = (item: NavItemType) => {
    const isHover = menuCurrentHovers.includes(item.id)
    return (
      <Popover
        as="li"
        key={item.id}
        className="relative px-2 menu-item menu-dropdown"
        onMouseEnter={() => onMouseEnterMenu(item.id)}
        onMouseLeave={() => onMouseLeaveMenu(item.id)}
      >
        {() => (
          <>
            <Popover.Button as={Fragment}>
              {renderDropdownMenuNavlink(item)}
            </Popover.Button>
            <Transition
              as={Fragment}
              show={isHover}
              enter="transition ease-out duration-150"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                className="absolute top-0 z-10 w-56 pl-2 sub-menu left-full"
              >
                <ul className="relative grid py-4 space-y-1 text-sm bg-white shadow-lg rounded-xl ring-1 ring-black ring-opacity-5 dark:ring-white dark:ring-opacity-10 dark:bg-neutral-900">
                  {item.children?.map((i) => {
                    if (i.type) {
                      return renderDropdownMenuNavlinkHasChild(i)
                    } else {
                      return (
                        <li key={i.id} className="px-2">
                          {renderDropdownMenuNavlink(i)}
                        </li>
                      )
                    }
                  })}
                </ul>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    )
  }

  const renderDropdownMenuNavlink = (item: NavItemType) => {
    return (
      <Link
        className="flex items-center px-4 py-2 font-normal rounded-md text-neutral-6000 dark:text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800 dark:hover:text-neutral-200"
        href={{
          pathname: item.href || undefined,
        }}
      >
        {item.name}
        {item.type && (
          <ChevronDownIcon
            className="w-4 h-4 ms-2 text-neutral-500"
            aria-hidden="true"
          />
        )}
      </Link>
    )
  }

  // ===================== MENU MAIN MENU =====================
  const renderMainItem = (item: NavItemType, active?: boolean) => {
    return (
      <div className="flex items-center flex-shrink-0 h-20">
        <Link
          className={cn(
            "inline-flex items-center text-sm lg:text-[15px] font-medium text-slate-700 dark:text-slate-300 py-2 px-3 xl:px-5 rounded-full hover:text-slate-900 hover:bg-slate-100 dark:hover:bg-pink-900 transition-colors dark:hover:text-slate-200 backdrop-blur-md bg-white/50 dark:bg-black/50",
            {
              "bg-black/90 text-white dark:bg-white/90 dark:text-black hover:bg-black hover:text-white hover:dark:bg-white hover:dark:text-black":
                active,
            }
          )}
          href={{
            pathname: item.href || undefined,
          }}
        >
          {item.name}
          {item.type && (
            <ChevronDownIcon
              className="w-4 h-4 ms-1 -me-1 text-slate-400"
              aria-hidden="true"
            />
          )}
        </Link>
      </div>
    )
  }

  switch (menuItem.type) {
    case "dropdown":
      return renderDropdownMenu(menuItem)
    case "megaMenu":
      return renderMegaMenu(menuItem)
    default:
      return (
        <li className="flex-shrink-0 menu-item">
          {renderMainItem(menuItem, active)}
        </li>
      )
  }
}

export default NavigationItem
