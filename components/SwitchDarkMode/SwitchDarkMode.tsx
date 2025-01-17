"use client"

import React from "react"
import { SunIcon } from "@heroicons/react/24/outline"
import { MoonIcon } from "@heroicons/react/24/solid"

import { useThemeMode } from "@/hooks/useThemeMode"

export interface SwitchDarkModeProps {
  className?: string
}
const SwitchDarkMode: React.FC<SwitchDarkModeProps> = ({ className = "" }) => {
  const { _toogleDarkMode, isDarkMode, toDark, toLight } = useThemeMode()

  return (
    <button
      onClick={_toogleDarkMode}
      className={`flex h-12 w-12 items-center justify-center self-center rounded-full text-2xl text-neutral-500 focus:outline-none dark:text-neutral-300 md:text-3xl hover:text-black dark:hover:text-white`}
    >
      <span className="sr-only">Enable dark mode</span>
      {isDarkMode ? (
        <MoonIcon className="w-5 h-5" aria-hidden="true" />
      ) : (
        <SunIcon className="w-5 h-5" aria-hidden="true" />
      )}
    </button>
  )
}

export default SwitchDarkMode
