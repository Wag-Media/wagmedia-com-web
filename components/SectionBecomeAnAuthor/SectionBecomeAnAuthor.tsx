import React, { FC } from "react"
import Image, { StaticImageData } from "next/image"
import rightImgDemo from "@/images/BecomeAnAuthorImg.png"
import { ArrowRight } from "lucide-react"

import ButtonPrimary from "@/components/Button/ButtonPrimary"

import { Button } from "../ui/button"

export interface SectionBecomeAnAuthorProps {
  className?: string
  rightImg?: string | StaticImageData
  children?: React.ReactNode
}

const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
  children,
}) => {
  return (
    <section className="py-20 bg-gradient-to-r from-[#FF2670] to-[#E4FF07] relative overflow-hidden">
      <div className="container relative z-10">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl drop-shadow-lg">
              Join WagMedia and Evolve Your Content Creation Journey!
            </h2>
            <p className="text-xl text-white/90 drop-shadow">
              You can earn rewards with your contribution to our various
              programs and bounties. Read and share new perspectives on just
              about any Polkadot related topic. We welcome genuine participants
              at any level.
            </p>
            <Button
              size="lg"
              className="bg-white text-[#FF2670] hover:bg-[#E4FF07] hover:text-black transition-all duration-300 transform hover:scale-105"
            >
              Become a Content Creator
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
          <div className="relative aspect-square lg:aspect-[4/3]">
            <Image
              src="/become-wagmedia-author.svg"
              alt="Join WagMedia"
              fill
              className="object-contain"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute bg-white rounded-full w-96 h-96 mix-blend-overlay filter blur-3xl -top-32 -left-32 animate-pulse"></div>
        <div className="w-96 h-96 bg-[#E4FF07] rounded-full mix-blend-overlay filter blur-3xl absolute -bottom-32 -right-32 animate-pulse"></div>
      </div>
    </section>
    // <div
    //   className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
    // >
    //   <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
    //     <span className="text-xs font-medium tracking-wider uppercase text-neutral-400">
    //       BECOME A CONTENT CREATOR
    //     </span>
    //     <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
    //       Join WagMedia to evolve your journey as a content creator by sharing
    //       news and creating content about the Polkadot ecosystem.
    //     </h2>
    //     <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
    //       You can earn rewards with your contribution to our various programs
    //       and bounties. Read and share new perspectives on just about any
    //       Polkadot related topic. We welcome genuine participants at any level.
    //     </span>
    //     {children}
    //   </div>
    //   <div className="flex-grow">
    //     <Image
    //       alt="hero"
    //       sizes="(max-width: 768px) 100vw, 50vw"
    //       src={rightImg}
    //     />
    //   </div>
    // </div>
  )
}

export default SectionBecomeAnAuthor
