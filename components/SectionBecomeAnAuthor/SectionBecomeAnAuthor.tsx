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
          Become a creator
        </span>
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Become a creator and share news and articles on Polkadot
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Become a creator and you can earn extra income by writing articles.
          Read and share new perspectives on just about any Polkadot related
          topic. Everyone&apos;s welcome.
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
