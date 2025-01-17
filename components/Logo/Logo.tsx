import React from "react"
import Image from "next/image"
import Link from "next/link"
import logoImg from "@/public/wagmedia-logo.png"

export interface LogoProps {
  img?: string
  imgLight?: string
}

const Logo: React.FC<LogoProps> = ({ img = logoImg }) => {
  return (
    <Link
      href="/"
      className="inline-block w-12 h-16 py-3 ttnc-logo text-primary-600"
    >
      <Image src={logoImg} alt="logo" className="w-auto h-full" />
    </Link>
  )
}

export default Logo
