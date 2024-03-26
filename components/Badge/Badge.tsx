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

const Badge: FC<BadgeProps> = ({
  className = "relative",
  name,
  color = "blue",
  href,
}) => {
  const getColorClass = (hasHover = true) => {
    switch (color) {
      case "pink":
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800/50" : ""
        }`
      case "red":
        return `text-red-800 bg-red-100/50 ${
          hasHover ? "hover:bg-red-800/50" : ""
        }`
      case "gray":
        return `text-gray-800 bg-gray-100/50 ${
          hasHover ? "hover:bg-gray-800/50" : ""
        }`
      case "green":
        return `text-green-800 bg-green-100/50 ${
          hasHover ? "hover:bg-green-800/50" : ""
        }`
      case "purple":
        return `text-purple-800 bg-purple-100/50 ${
          hasHover ? "hover:bg-purple-800/50" : ""
        }`
      case "indigo":
        return `text-indigo-800 bg-indigo-100/50 ${
          hasHover ? "hover:bg-indigo-800/50" : ""
        }`
      case "yellow":
        return `text-yellow-800 bg-yellow-100/50 ${
          hasHover ? "hover:bg-yellow-800/50" : ""
        }`
      case "blue":
        return `text-blue-800 bg-blue-100/50 ${
          hasHover ? "hover:bg-blue-800/50" : ""
        }`
      default:
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800" : ""
        }`
    }
  }

  const CLASSES =
    "nc-Badge inline-flex px-2.5 py-1 rounded-full font-medium text-xs " +
    className
  return !!href ? (
    <Link
      href={href || "/"}
      className={`transition-colors hover:text-white duration-300 ${CLASSES}`}
    >
      {name}
    </Link>
  ) : (
    <span
      className={`${CLASSES} backdrop-blur-sm text-white border bg-black/20`}
    >
      {name}
    </span>
  )
}

export default Badge
