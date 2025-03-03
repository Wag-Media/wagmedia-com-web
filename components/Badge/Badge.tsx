import React, { FC, ReactNode } from "react"
import Link from "next/link"
import { TwMainColor } from "@/data/types"
import { Route } from "@/routers/types"

export interface BadgeProps {
  className?: string
  name: ReactNode
  color?: TwMainColor
  href?: Route
}

const Badge: FC<BadgeProps> = ({ className = "relative", name, href }) => {
  const CLASSES =
    "nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs " +
    className
  return !!href ? (
    <Link
      href={href || "/"}
      className={`transition-colors hover:text-white duration-300 ${CLASSES} from-`}
    >
      {name === "Jam" ? "JAM" : name}
    </Link>
  ) : (
    <span
      className={`${CLASSES} backdrop-blur-sm text-white bg-blue-600/60 hover:bg-blue-600/80`}
    >
      {name === "Jam" ? "JAM" : name}
    </span>
  )
}

export default Badge
