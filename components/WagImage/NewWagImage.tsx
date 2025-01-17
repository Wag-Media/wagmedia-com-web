"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import nextConfig from "next.config.mjs"

import { cn } from "@/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"

export function ImageGood({
  src,
  width,
  height,
  alt,
  priority = false,
  className,
  fallbackSrc = "/placeholder.svg",
  ...props
}: {
  src: string
  width?: number
  height?: number
  alt: string
  priority?: boolean
  className?: string
  fallbackSrc?: string
  [key: string]: any
}) {
  const [isLoading, setIsLoading] = useState(true)
  const [hasError, setHasError] = useState(false)

  const hostnames = nextConfig.images?.remotePatterns?.map((pattern) =>
    pattern.hostname.replace("**.", "")
  )

  const handleLoad = () => {
    const img = new window.Image()
    img.src = src

    img.onload = () => setIsLoading(false)
    img.onerror = handleError
  }

  const handleError = () => {
    setIsLoading(false)
    setHasError(true)
  }

  useEffect(() => {
    handleLoad()
  }, [src])

  if (hasError)
    return (
      <Image
        src={fallbackSrc}
        width={width ?? 100}
        height={height ?? 100}
        alt={`Fallback for: ${alt}`}
        className={className}
        {...props}
      />
    )

  if (hostnames?.includes(src)) {
    return (
      <div className="relative w-full h-full">
        <Skeleton
          className={cn(
            "absolute inset-0 dark:bg-gray-900",
            isLoading ? "opacity-100" : "opacity-0",
            className
          )}
          style={{ width, height }}
        />
        <Image
          src={src}
          width={width}
          height={height}
          alt={alt}
          priority={priority}
          className={cn(
            "transition-opacity duration-1000",
            isLoading ? "opacity-0" : "opacity-100",
            className
          )}
          onLoad={handleLoad}
          onError={handleError}
          {...props}
        />
      </div>
    )
  }

  return (
    <div className="relative w-full h-full">
      <Skeleton
        className={cn(
          "absolute inset-0 dark:bg-gray-900",
          isLoading ? "opacity-100" : "opacity-0",
          className
        )}
        style={{ width, height }}
      />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn(
          "transition-all duration-1000",
          isLoading ? "opacity-0 scale-105" : "opacity-100 scale-100",
          className
        )}
        onLoad={handleLoad}
        onError={handleError}
        {...props}
      />
    </div>
  )
}
