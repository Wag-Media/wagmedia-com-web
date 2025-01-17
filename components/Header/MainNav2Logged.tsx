"use client"

import React, { FC } from "react"
import Link from "next/link"
import { DiscordIcon } from "@/images/icons"

import { siteConfig } from "@/config/site"
import Logo from "@/components/Logo/Logo"
import MenuBar from "@/components/MenuBar/MenuBar"
import { SearchModal } from "@/app/search/search-modal"

import NavigationWag from "../Navigation/NavigationWag"
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode"

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const renderContent = () => {
    return (
      <div className="flex justify-center h-16">
        <div className="flex items-center lg:hidden ">
          <MenuBar />
        </div>

        <div className="flex items-center flex-1 lg:flex-none">
          <div className="flex items-center h-12 pl-[3px] border-2 rounded-full backdrop-blur-md border-background/80 bg-background/60">
            <Logo />
            <NavigationWag className="z-10 hidden h-12 p-3 lg:flex" />
          </div>
        </div>

        <div className="absolute flex items-center justify-end h-16 right-2 text-slate-700 dark:text-slate-100">
          <div className="flex h-12 p-1 rounded-full backdrop-blur-md">
            <SearchModal />
            {/* <NotifyDropdown /> */}
            <SwitchDarkMode />
            <button
              className={`flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl text-neutral-500 focus:outline-none dark:text-neutral-300 md:text-3xl hover:text-black dark:hover:text-white`}
            >
              <span className="sr-only">Discord</span>
              <Link href={siteConfig.links.discord}>
                <DiscordIcon size={25} className="text-current" />
              </Link>
            </button>
          </div>
          {/* <AvatarDropdown /> */}
        </div>
      </div>
    )
  }

  return (
    <div className="relative z-10 nc-MainNav2Logged">
      <div className="container">{renderContent()}</div>
    </div>
  )
}

export default MainNav2Logged
