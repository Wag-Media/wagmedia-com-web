"use client"

import React, { FC } from "react"

import Logo from "@/components/Logo/Logo"
import MenuBar from "@/components/MenuBar/MenuBar"
import { SearchModal } from "@/app/search/search-modal"

import Input from "../Input/Input"
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode"
import AvatarDropdown from "./AvatarDropdown"
import LangDropdown from "./LangDropdown"
import NotifyDropdown from "./NotifyDropdown"
import TemplatesDropdown from "./TemplatesDropdown"

export interface MainNav2Props {
  className?: string
}

const MainNav2: FC<MainNav2Props> = ({ className = "" }) => {
  const renderSearchForm = () => {
    return (
      <div className="relative group">
        <div className="absolute inset-0"></div>
        <Input
          type="search"
          placeholder="Search items"
          className="pr-5 md:pr-10 !w-40 md:!w-full group-hover:border-slate-300 dark:group-hover:border-slate-400 dark:placeholder:text-neutral-400"
          sizeClass="h-[42px] pl-4 py-3"
          autoFocus={false}
        />
        <span className="absolute -translate-y-1/2 top-1/2 right-3 text-neutral-500 dark:text-neutral-400">
          <svg
            className="w-5 h-5"
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
        </span>
        <div className="absolute inset-0"></div>
      </div>
    )
  }

  return (
    <div className="relative z-10 bg-white nc-MainNav2 dark:bg-slate-900 ">
      <div className="container">
        <div className="flex justify-between h-20">
          <div className="flex items-center flex-1 md:hidden">
            <MenuBar />
          </div>

          <div className="flex items-center space-x-3 lg:flex-1 rtl:space-x-reverse sm:space-x-8">
            <Logo />

            <div className="hidden h-10 md:block border-s border-slate-200 dark:border-slate-700"></div>

            <div className="flex-grow hidden max-w-xs sm:block">
              <SearchModal renderTrigger={renderSearchForm} />
            </div>
          </div>

          <div className="flex items-center justify-end flex-1 ">
            <TemplatesDropdown />
            <LangDropdown />
            <SwitchDarkMode />
            <NotifyDropdown className="hidden md:block" />
            <AvatarDropdown />
          </div>
        </div>
      </div>
    </div>
  )
}

export default MainNav2
