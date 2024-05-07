"use client"

import React, { FC } from "react"
import Link from "next/link"
import { DiscordIcon } from "@/images/icons"

import { siteConfig } from "@/config/site"
import Logo from "@/components/Logo/Logo"
import MenuBar from "@/components/MenuBar/MenuBar"

import NavigationWag from "../Navigation/NavigationWag"
import SwitchDarkMode from "../SwitchDarkMode/SwitchDarkMode"
import AvatarDropdown from "./AvatarDropdown"
import NotifyDropdown from "./NotifyDropdown"
import SearchModal from "./SearchModal"

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const renderContent = () => {
    return (
      <div className="flex h-20 justify-between">
        <div className="flex items-center lg:hidden ">
          <MenuBar />
        </div>

        <div className="flex flex-1 items-center">
          <Logo />
        </div>

        <div className="mx-4 hidden flex-[2] justify-center lg:flex">
          <NavigationWag className="z-10 h-16 p-3 mt-2" />
          {/* <div className="absolute rounded-full top-full -translate-y-full left-1/2 -translate-x-1/2 bg-[#E6007A] w-[50vh] h-[50vh]" /> */}
        </div>

        <div className="flex flex-1 items-center justify-end text-slate-700 dark:text-slate-100">
          <div className="flex rounded-full bg-background/60 backdrop-blur-md h-16 p-3">
            {/* <SearchModal /> */}
            {/* <NotifyDropdown /> */}
            <SwitchDarkMode />
            <button
              className={`flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl`}
            >
              <span className="sr-only">Enable dark mode</span>
              <Link href={siteConfig.links.discord}>
                <DiscordIcon size={25} />
              </Link>
            </button>
          </div>
          {/* <AvatarDropdown /> */}
        </div>
      </div>
    )
  }

  return (
    <div className="nc-MainNav2Logged relative z-10">
      <div className="container ">{renderContent()}</div>
    </div>
  )
}

export default MainNav2Logged
