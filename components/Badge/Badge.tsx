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
    switch (name) {
      case "OpenGov":
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-800/50" : ""
        }`
      case "DeFi":
        return `text-red-800 bg-red-100/50 ${
          hasHover ? "hover:bg-red-800/50" : ""
        }`
      case "NFT":
        return `text-gray-800 bg-gray-100/50 ${
          hasHover ? "hover:bg-gray-800/50" : ""
        }`
      case "Parachain":
        return `text-green-800 bg-green-100/50 ${
          hasHover ? "hover:bg-green-800/50" : ""
        }`
      case "Paraverse":
        return `text-purple-800 bg-purple-100/50 ${
          hasHover ? "hover:bg-purple-800/50" : ""
        }`
      case "Newsletter":
        return `text-indigo-800 bg-indigo-100/50 ${
          hasHover ? "hover:bg-indigo-800/50" : ""
        }`
      case "Non Anglo":
      case "Translations":
        return `text-yellow-800 bg-yellow-100/50 ${
          hasHover ? "hover:bg-yellow-800/50" : ""
        }`
      case "Technical Analysis":
        return `text-blue-800 bg-blue-100/50 ${
          hasHover ? "hover:bg-blue-800/50" : ""
        }`
      case "Bounty":
        return `text-orange-800 bg-orange-100/50 ${
          hasHover ? "hover:bg-orange-800/50" : ""
        }`
      case "Tutorials":
        return `text-teal-800 bg-teal-100/50 ${
          hasHover ? "hover:bg-teal-800/50" : ""
        }`
      case "Video":
        return `text-lime-800 bg-lime-100/50 ${
          hasHover ? "hover:bg-lime-800/50" : ""
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
    <span className={`${CLASSES} backdrop-blur-sm ${getColorClass()}`}>
      {name}
    </span>
  )
}

export default Badge
