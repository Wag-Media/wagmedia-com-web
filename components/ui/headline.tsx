import { createElement } from "react"

import { cn } from "@/lib/utils"

export function Headline({
  children,
  className,
  level = "h2",
  subtitle,
}: {
  children: React.ReactNode
  className?: string
  subtitle?: React.ReactNode
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 mb-10 text-center",
        className
      )}
    >
      {createElement(
        level,
        {
          className: "text-3xl font-bold text-gray-900 dark:text-white",
        },
        children
      )}
      {subtitle && (
        <p className="text-lg text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  )
}
