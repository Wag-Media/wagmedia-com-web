import React, { FC, use } from "react"
import { usePathname, useRouter } from "next/navigation"
import { NAVIGATION_DEMO_2 } from "@/data/navigation"

import NavigationItem, { NavItemType } from "./NavigationItem"

interface Props {
  className?: string
}

const navMenuItems: NavItemType[] = [
  {
    id: "1",
    name: "Categories",
    href: "/categories",
  },
  {
    id: "1",
    name: "Non Anglo",
    href: "/non-anglo",
  },
  {
    id: "2",
    name: "Newsletter",
    href: "/newsletter",
  },
  {
    id: "3",
    name: "News",
    href: "/news",
  },
  {
    id: "4",
    name: "Audit",
    href: "/audit",
  },
  {
    id: "5",
    name: "About",
    href: "/about",
  },
]

const NavigationWag: FC<Props> = ({ className = "flex" }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <ul
      className={`nc-Navigation rounded-full bg-background/60 backdrop-blur-md items-center flex ${className}`}
    >
      {navMenuItems.map((item) => (
        <NavigationItem
          key={item.id}
          menuItem={item}
          active={item.href === pathname}
        />
      ))}
    </ul>
  )
}

export default NavigationWag
