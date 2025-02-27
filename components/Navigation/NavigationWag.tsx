import React, { FC } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronDownIcon } from "@heroicons/react/24/outline"

import { siteConfig } from "../../config/site"
import NavigationItem from "./NavigationItem"

interface Props {
  className?: string
}

const NavigationWag: FC<Props> = ({ className = "flex" }) => {
  const pathname = usePathname()

  const isActiveLink = (item: (typeof siteConfig.navMenuItems)[0]) => {
    if (pathname.includes(item.href)) return true
    if (item.children?.some((child) => pathname.includes(child.href)))
      return true
    return false
  }

  return (
    <nav className="relative">
      <ul
        className={`nc-Navigation font-medium rounded-full items-center flex gap-0.5 ${className}`}
      >
        {siteConfig.navMenuItems.map((item) => (
          <li key={item.id} className="relative group">
            {item.children ? (
              <div
                className={`flex items-center px-4 py-2 text-sm cursor-pointer hover:text-blue-800 dark:hover:text-[var(--secondary-color)] ${
                  isActiveLink(item) ? "text-[var(--secondary-color)]" : ""
                }`}
              >
                {item.name}
                <ChevronDownIcon className="w-3 h-3 ms-1" />
              </div>
            ) : (
              <Link
                href={item.href}
                className={`flex items-center px-4 py-2 text-sm hover:text-blue-800 dark:hover:text-[var(--secondary-color)] ${
                  isActiveLink(item) ? "text-blue-800" : ""
                }`}
              >
                {item.name}
              </Link>
            )}

            {item.children && (
              <ul className="absolute hidden group-hover:block top-full left-0 backdrop-blur-md bg-background/50 shadow-lg rounded-lg py-2 min-w-[200px]">
                {item.children.map((child) => (
                  <li key={child.id}>
                    <Link
                      href={child.href}
                      className={`block px-4 py-2 text-sm hover:text-blue-800 dark:hover:text-[var(--secondary-color)] ${
                        pathname.includes(child.href) ? "text-blue-800" : ""
                      }`}
                    >
                      {child.name}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default NavigationWag
