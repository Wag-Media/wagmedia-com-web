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
        return `text-amber-800 bg-amber-100/50 ${
          hasHover ? "hover:bg-amber-800/50" : ""
        }`
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
      case "Wallet":
        return `text-blue-800 bg-blue-100/50 ${
          hasHover ? "hover:bg-blue-800/50" : ""
        }`
      case "RWA":
        return `text-purple-800 bg-purple-100/50 ${
          hasHover ? "hover:bg-purple-800/50" : ""
        }`
      case "Rollup":
        return `text-orange-800 bg-orange-100/50 ${
          hasHover ? "hover:bg-orange-800/50" : ""
        }`
      case "Jam":
        return `text-pink-200 bg-gradient-to-r from-pink-500 to-pink-600 ${
          hasHover ? "hover:bg-black-800" : ""
        }`
      case "Grant":
        return `text-black bg-gradient-to-r from-cyan-400 to-orange-400 ${
          hasHover ? "hover:bg-black-800" : ""
        }`
      case "DV":
        return `text-gray-200 bg-gradient-to-r from-gray-500 to-gray-600 ${
          hasHover ? "hover:bg-black-800" : ""
        }`
      case "DAO":
        return `text-gray-800 bg-gradient-to-r from-fuchsia-500 to-fuchsia-600 ${
          hasHover ? "hover:text-white" : ""
        }`
      case "Coretime":
        return `text-gray-800 bg-gradient-to-r from-emerald-500 to-emerald-600 ${
          hasHover ? "hover:text-white" : ""
        }`
      default:
        return `text-pink-800 bg-pink-100/50 ${
          hasHover ? "hover:bg-pink-200" : ""
        }`
    }
  }

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
    <span className={`${CLASSES} backdrop-blur-sm ${getColorClass()}`}>
      {name === "Jam" ? "JAM" : name}
    </span>
  )
}

export default Badge
