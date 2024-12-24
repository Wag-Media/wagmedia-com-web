import Image from "next/image"

import { cn } from "@/lib/utils"

export function WagImage({
  image,
  containerClassName = "",
  containerStyle = {},
  className = "object-contain w-full h-full backdrop-blur-lg",
  sizes = "(max-width: 600px) 480px, 800px",
  ...props
}: {
  image: string | undefined | null
  [key: string]: any
}) {
  if (!image) return null

  if (image.includes("discordapp")) {
    return (
      <div className={containerClassName} style={containerStyle}>
        <Image
          src={image}
          className={cn(className, props.className)}
          alt={props.alt}
          width={1000}
          height={1000}
          {...props}
        />
      </div>
    )
  } else {
    return (
      <div className={containerClassName} style={containerStyle}>
        <img
          src={image}
          alt={props.alt}
          className={cn(className, props.className)}
          width={1000}
          height={1000}
          {...props}
        />
      </div>
    )
  }
}
