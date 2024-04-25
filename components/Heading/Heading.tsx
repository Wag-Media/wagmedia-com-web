import React, { HTMLAttributes, ReactNode, createElement } from "react"

export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  fontClass?: string
  desc?: ReactNode
  isCenter?: boolean
  as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"
}

const Heading: React.FC<HeadingProps> = ({
  as = "h2",
  children,
  desc = "Discover the most outstanding articles in all topics of life. ",
  className = "mb-10 md:mb-12 text-neutral-900 dark:text-neutral-50",
  isCenter = false,
  ...args
}) => {
  return (
    <div
      className={`nc-Section-Heading relative flex flex-col sm:flex-row sm:items-end justify-between ${className}`}
    >
      <div
        className={
          isCenter ? "text-center w-full max-w-3xl mx-auto " : "max-w-5xl"
        }
      >
        {createElement(
          as,
          {
            className: "text-xl md:text-4xl lg:text-5xl font-bold",
            ...args,
          },
          children || `Section Heading`
        )}
        {desc && (
          <span className="mt-2 md:mt-3 font-normal block text-base sm:text-xl text-neutral-500 dark:text-neutral-400">
            {desc}
          </span>
        )}
      </div>
    </div>
  )
}

export default Heading
