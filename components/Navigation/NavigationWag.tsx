import React, { FC } from "react"
import { usePathname } from "next/navigation"

import { siteConfig } from "../../config/site"
import NavigationItem from "./NavigationItem"

interface Props {
  className?: string
}

const NavigationWag: FC<Props> = ({ className = "flex" }) => {
  const pathname = usePathname()

  return (
    <ul
      className={`nc-Navigation rounded-full items-center flex gap-0.5 ${className}`}
    >
      {siteConfig.navMenuItems.map((item) => (
        <NavigationItem
          key={item.id}
          menuItem={item}
          active={pathname.includes(item.href)}
        />
      ))}
    </ul>
  )
}

export default NavigationWag
