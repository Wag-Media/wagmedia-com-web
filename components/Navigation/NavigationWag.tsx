import React, { FC } from "react"
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
    id: "2",
    name: "Newsletter",
    href: "/newsletter",
  },
  {
    id: "3",
    name: "Finders",
    href: "/finders",
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
  return (
    <ul className={`nc-Navigation items-center ${className}`}>
      {navMenuItems.map((item) => (
        <NavigationItem key={item.id} menuItem={item} />
      ))}
    </ul>
  )
}

export default NavigationWag
