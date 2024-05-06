import React, { FC } from "react"
import Image, { StaticImageData } from "next/image"
import rightImgDemo from "@/images/BecomeAnAuthorImg.png"

import ButtonPrimary from "@/components/Button/ButtonPrimary"

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
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <span className="text-xs uppercase tracking-wider font-medium text-neutral-400">
          BECOME A CONTENT CREATOR
        </span>
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Join WagMedia to evolve your journey as a content creator by sharing
          news and creating content about the Polkadot ecosystem.
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          You can earn rewards with your contribution to our various programs
          and bounties. Read and share new perspectives on just about any
          Polkadot related topic. We welcome genuine participants at any level.
        </span>
        {children}
      </div>
      <div className="flex-grow">
        <Image
          alt="hero"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={rightImg}
        />
      </div>
    </div>
  )
}

export default SectionBecomeAnAuthor
