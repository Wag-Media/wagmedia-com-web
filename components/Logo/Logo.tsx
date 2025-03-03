import React from "react"
import Image from "next/image"
import Link from "next/link"
import logoImg from "@/public/wagmedia-logo.png"

import { cn } from "@/lib/utils"

export interface LogoProps {
  className?: string
}

const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <Link
      href="/"
      className={cn("inline-block w-12 h-16 py-3 text-primary-600", className)}
    >
      <Image
        src={logoImg}
        alt="logo"
        className="w-auto h-full p-0.5 brightness-0 dark:brightness-100"
      />
    </Link>
  )
}

export default Logo
