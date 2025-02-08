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
              WagMedia is a decentralized media initiative that offers the
              platform for creators to earn tokens for their content.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#FF2670]">
              Quick Links
            </h3>
            <div className="flex flex-row gap-4">
              <ul className="space-y-2">
                {siteConfig.navMenuItems.slice(0, 5).map((item, index) => (
                  <li key={index}>
                    <Link
                      key={index}
                      href={item.href}
                      className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="space-y-2">
                {siteConfig.navMenuItems.slice(5).map((item, index) => (
                  <li key={index}>
                    <Link
                      key={index}
                      href={item.href}
                      className="text-gray-600 hover:text-[#FF2670] dark:text-gray-400 dark:hover:text-[#FF2670]"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
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
            className="flex flex-col items-center mt-4 group md:flex-row md:mt-0"
          >
            <span
              className={cn(
                fontUnbounded.className,
                "text-lg md:text-xl lg:text-2xl group-hover:text-[#FF2670]"
              )}
            >
              Powered by
            </span>
            <Icons.polkadotLogo className="w-auto h-12 group-hover:text-[#FF2670]" />
          </Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer
