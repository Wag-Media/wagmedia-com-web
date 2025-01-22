"use client"

import React from "react"
import { SunIcon } from "@heroicons/react/24/outline"
import { MoonIcon } from "@heroicons/react/24/solid"
import { useTheme } from "next-themes"

export interface SwitchDarkModeProps {
  className?: string
}
export function SwitchDarkMode({ className = "" }: SwitchDarkModeProps) {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`self-center text-2xl md:text-3xl w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center backdrop-blur-lg mr-0.5 ${className}`}
    >
      <span className="sr-only">Enable dark mode</span>
      {theme === "dark" ? (
        <MoonIcon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <SunIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}
