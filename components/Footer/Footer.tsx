import React from "react"
import Link from "next/link"
import { CustomLink } from "@/data/types"

import { siteConfig } from "@/config/site"
import { fontUnbounded } from "@/lib/fonts"
import Logo from "@/components/Logo/Logo"

import { cn } from "../../lib/utils"
import { Icons } from "../icons"

export interface WidgetFooterMenu {
  id: string
  title: string
  menus: CustomLink[]
}

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-gray-50 dark:bg-gray-950">
      <div className="container">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="max-w-md md:col-span-2">
            <h3 className="text-lg font-semibold mb-4 text-[#FF2670]">
              About WagMedia
            </h3>
            <p className="mb-4">Your ideas, your audience, your rewards.</p>
            <p className="text-gray-600 dark:text-gray-400">
              Decentralizing the story of Polkadot and Kusama through
              community-driven content creation and curation.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF2670]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/terms"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF2670]">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://x.com/thatMediaWag"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  Twitter
                </a>
              </li>
              <li>
                <a
                  href="https://discord.com/invite/dTnkwXgJXT"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  Discord
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/Wag-Media"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between pt-8 mt-8 text-center text-gray-500 md:flex-row dark:text-gray-400">
          <div className="flex flex-row items-center justify-center">
            <p>&copy; {new Date().getFullYear()}</p>
            <Logo className="w-10 h-10 py-0 mx-2" />
            <p>All rights reserved.</p>
          </div>
          <Link
            href="https://polkadot.network/"
            className="flex items-center group"
          >
            <span
              className={cn(
                fontUnbounded.className,
                "text-xl md:text-3xl lg:text-4xl group-hover:text-[#FF2670]"
              )}
            >
              Powered by
            </span>
            <Icons.polkadotLogo className="w-auto h-16 group-hover:text-[#FF2670]" />
          </Link>
        </div>
      </div>
    </footer>
    // <div className="relative py-8 border-t nc-Footer lg:py-16 border-neutral-200 dark:border-neutral-700">
    //   <div className="container grid items-center grid-cols-2 gap-y-10 gap-x-5 sm:gap-x-8 lg:grid-cols-5 lg:gap-x-10">
    //     <div className="w-24 h-24 col-span-1 lg:col-span-1 lg:h-48 lg:w-48">
    //       <Logo />
    //     </div>
    //     <div className="col-span-3 lg:col-span-3">
    //       <p className="max-w-md text-neutral-500 dark:text-neutral-400">
    //         WagMedia is a decentralized media initiative that offers the
    //         platform for creators to earn tokens for their content.
    //       </p>
    //       <Link
    //         href="https://polkadot.network/"
    //         className="flex items-center mt-2"
    //       >
    //         <span
    //           className={cn(
    //             fontUnbounded.className,
    //             "text-xl md:text-3xl lg:text-4xl"
    //           )}
    //         >
    //           Powered by
    //         </span>
    //         <Icons.polkadotLogo className="w-auto h-16" />
    //       </Link>
    //     </div>
    //     <div className="col-span-3 lg:col-span-1">
    //       <nav className="flex text-md text-neutral-6000 dark:text-neutral-300 items-center lg:space-x-0 rtl:space-x-reverse lg:flex-col lg:space-y-2.5 lg:items-end flex-wrap">
    //         {siteConfig.navMenuItems.map((item, index) => (
    //           <Link key={index} href={item.href} className="block mr-3 lg:mr-0">
    //             {item.name}
    //           </Link>
    //         ))}
    //       </nav>
    //     </div>

    //     {/* {widgetMenus.map(renderWidgetMenuItem)} */}
    //   </div>
    // </div>
  )
}

export default Footer
