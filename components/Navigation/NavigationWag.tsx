import React, { FC, use } from "react"
import { usePathname, useRouter } from "next/navigation"
import { NAVIGATION_DEMO_2 } from "@/data/navigation"

import { siteConfig } from "../../config/site"
import NavigationItem, { NavItemType } from "./NavigationItem"

interface Props {
  className?: string
}

const NavigationWag: FC<Props> = ({ className = "flex" }) => {
  const router = useRouter()
  const pathname = usePathname()

  return (
    <ul
      className={`nc-Navigation rounded-full bg-background/60 backdrop-blur-md items-center flex ${className}`}
    >
      {siteConfig.navMenuItems.map((item) => (
        <>
          <NavigationItem
            key={item.id}
            menuItem={item}
            active={pathname.includes(item.href)}
          />
        </>
      ))}
    </ul>
  )
}

export default NavigationWag
