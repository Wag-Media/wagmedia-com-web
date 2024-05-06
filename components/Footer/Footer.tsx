import React from "react"
import Image from "next/image"
import Link from "next/link"
import { CustomLink } from "@/data/types"
import polkadotBlack from "@/public/Polkadot_Logo_Horizontal_Pink_Black.png"
import polkadotWhite from "@/public/Polkadot_Logo_Horizontal_Pink_White.png"

import { siteConfig } from "@/config/site"
import { fontUnbounded } from "@/lib/fonts"
import Logo from "@/components/Logo/Logo"
import SocialsList1 from "@/components/SocialsList1/SocialsList1"

import { cn } from "../../lib/utils"
import { Icons } from "../icons"

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Getting started",
    menus: [
      { href: "/", label: "Installation" },
      { href: "/", label: "Release Notes" },
      { href: "/", label: "Upgrade Guide" },
      { href: "/", label: "Browser Support" },
      { href: "/", label: "Editor Support" },
    ],
  },
  {
    id: "1",
    title: "Explore",
    menus: [
      { href: "/", label: "Design features" },
      { href: "/", label: "Prototyping" },
      { href: "/", label: "Design systems" },
      { href: "/", label: "Pricing" },
      { href: "/", label: "Customers" },
    ],
  },
  {
    id: "2",
    title: "Resources",
    menus: [
      { href: "/", label: "Best practices" },
      { href: "/", label: "Support" },
      { href: "/", label: "Developers" },
      { href: "/", label: "Learn design" },
      { href: "/", label: "What's new" },
    ],
  },
  {
    id: "4",
    title: "Community",
    menus: [
      { href: "/", label: "Discussion Forums" },
      { href: "/", label: "Code of Conduct" },
      { href: "/", label: "Community Resources" },
      { href: "/", label: "Contributing" },
      { href: "/", label: "Concurrent Mode" },
    ],
  },
]

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-4">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <>
      {/* music player */}
      {/* <MusicPlayer /> */}

      {/* footer */}
      <div className="nc-Footer relative py-8 lg:py-16 border-t border-neutral-200 dark:border-neutral-700">
        <div className="container grid grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10 items-center">
          <div className="col-span-1 lg:col-span-1">
            <Logo />
          </div>
          <div className="col-span-3 lg:col-span-3">
            <p className="text-neutral-500 dark:text-neutral-400 max-w-md">
              WagMedia is a decentralized media initiative that offers the
              platform for creators to earn tokens for their content.
            </p>
            <Link
              href="https://polkadot.network/"
              className="flex items-center mt-2"
            >
              <span className={cn(fontUnbounded.className, "text-4xl")}>
                Powered by
              </span>
              <Icons.polkadotLogo className="h-20 w-auto" />
            </Link>
          </div>
          <div className="col-span-3 lg:col-span-1">
            <nav className="flex text-md text-neutral-6000 dark:text-neutral-300 items-center lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-end flex-wrap">
              {siteConfig.navMenuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="block mr-3 lg:mr-0"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>

          {/* {widgetMenus.map(renderWidgetMenuItem)} */}
        </div>
      </div>
    </>
  )
}

export default Footer
