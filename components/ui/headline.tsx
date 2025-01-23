import { createElement } from "react"

import { cn } from "@/lib/utils"

export function Headline({
  children,
  className,
  level = "h2",
  subtitle,
  subtitleClassName,
  containerClassName,
}: {
  children: React.ReactNode
  className?: string
  containerClassName?: string
  subtitle?: React.ReactNode
  subtitleClassName?: string
  level?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}) {
  return (
    <div
      className={cn(
        "flex flex-col items-center gap-4 mb-10 text-center",
        containerClassName
      )}
    >
      {createElement(
        level,
        {
          className: cn(
            {
              "text-4xl font-bold text-gray-900 dark:text-white":
                level === "h1",
              "text-2xl font-bold text-gray-900 dark:text-white":
                level === "h2",
            },
            className
          ),
        },
        children
      )}
      {subtitle && (
        <p
          className={cn(
            {
              "text-lg text-gray-500 dark:text-gray-400": level === "h1",
              "text-base text-gray-500 dark:text-gray-400": level === "h2",
            },
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
