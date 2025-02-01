import React, { FC } from "react"
import Link from "next/link"
import { DiscordIcon } from "@/images/icons"

import { siteConfig } from "@/config/site"
import Logo from "@/components/Logo/Logo"
import MenuBar from "@/components/MenuBar/MenuBar"
import { SearchModal } from "@/app/search/search-modal"

import NavigationWag from "../Navigation/NavigationWag"
import { SwitchDarkMode } from "../switch-dark-mode"

export interface MainNav2LoggedProps {}

const MainNav2Logged: FC<MainNav2LoggedProps> = () => {
  const renderContent = () => {
    return (
      <div className="flex justify-center h-16">
        <div className="flex items-center lg:hidden ">
          <MenuBar />
        </div>

        <div className="flex items-center flex-1 lg:flex-none">
          <div className="flex items-center h-12 pl-[4px] rounded-full backdrop-blur-lg shadow-sm">
            <Logo />
            <NavigationWag className="z-10 hidden h-12 p-3 lg:flex" />
          </div>
        </div>

        <div className="absolute right-0 flex items-center text-slate-700 dark:text-slate-100">
          <div className="flex h-16 p-3 rounded-full">
            <SearchModal />
            {/* <NotifyDropdown /> */}
            <SwitchDarkMode />
            <button
              className={`flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl text-neutral-500 hover:bg-neutral-100 focus:outline-none dark:text-neutral-300 dark:hover:bg-neutral-800 md:text-3xl backdrop-blur-xl`}
            >
              <span className="sr-only">Discord</span>
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
    <div className="relative z-10 nc-MainNav2Logged">
      <div className="container">{renderContent()}</div>
    </div>
  )
}

export default MainNav2Logged
