"use client"

import React, { ButtonHTMLAttributes, FC } from "react"
import Link from "next/link"
import { Route } from "@/routers/types"

import Loading from "./Loading"

export interface ButtonProps {
  className?: string
  sizeClass?: string
  fontSize?: string
  pattern?: "primary" | "secondary" | "third" | "white" | "default"
  //
  loading?: boolean
  disabled?: boolean
  type?: ButtonHTMLAttributes<HTMLButtonElement>["type"]
  href?: Route
  targetBlank?: boolean
  onClick?: () => void
  children?: React.ReactNode
}

const Button: FC<ButtonProps> = ({
  pattern = "default",
  className = "",
  sizeClass = "py-3 px-4 sm:py-3.5 sm:px-6",
  fontSize = "text-sm sm:text-base font-medium",
  disabled = false,
  href,
  children,
  type,
  loading,
  onClick = () => {},
}) => {
  let colors =
    "bg-neutral-900 hover:bg-neutral-800 text-white dark:bg-neutral-100 dark:hover:bg-neutral-50 dark:text-black"
  switch (pattern) {
    case "primary":
      colors =
        "bg-gradient-to-br from-[#f9b900] to-[#b51800] hover:from-[#f9b944] hover:to-[#b51899] text-white"
      break
    case "secondary":
      colors = "bg-secondary-500 hover:bg-secondary-6000 text-secondary-50"
      break
    case "white":
      colors =
        "bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200"
      break
    case "third":
      colors =
        "bg-white dark:bg-neutral-900 ring-1 ring-neutral-300 hover:ring-neutral-400 dark:ring-neutral-700 dark:hover:ring-neutral-500"
      break

    default:
      break
  }

  let CLASSES = `nc-Button flex-shrink-0 relative h-auto inline-flex items-center justify-center rounded-full transition-colors border-transparent ${colors} ${fontSize} ${sizeClass} ${className} `

  if (!!href) {
    return (
      <Link href={href} className={`${CLASSES} `} onClick={onClick} type={type}>
        {loading && <Loading />}
        {children || `This is Link`}
      </Link>
    )
  }

  return (
    <button
      disabled={disabled || loading}
      className={`${CLASSES}`}
      onClick={onClick}
      type={type}
    >
      {loading && <Loading />}
      {children || `Button default`}
    </button>
  )
}

export default Button
