import React, { FC } from "react"
import Image from "next/image"
import rightImg from "@/images/SVG-subcribe2.png"
import { ArrowRightIcon } from "@heroicons/react/24/solid"

import Badge from "@/components/Badge/Badge"
import ButtonCircle from "@/components/Button/ButtonCircle"
import Input from "@/components/Input/Input"

export interface SectionSubscribe2Props {
  className?: string
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionSubscribe2 relative flex mb-12 flex-col lg:flex-row items-center ${className}`}
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:me-10 lg:w-2/5">
        <h2 className="font-semibold text-4xl">Never Miss Any News 🎉</h2>
        <span className="block mt-6 text-neutral-500 dark:text-neutral-400">
          With the WagMedia Newsletter you will get the latest news and updates
          on Polkadot directly to your inbox.
        </span>
        <ul className="space-y-5 mt-10">
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge name="01" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Stay up to date with the latest news
            </span>
          </li>
          <li className="flex items-center space-x-4 rtl:space-x-reverse">
            <Badge color="red" name="02" />
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Special offers and promotions
            </span>
          </li>
        </ul>
        <form className="mt-10 relative max-w-sm">
          <Input
            required
            aria-required
            placeholder="Enter your email"
            type="email"
          />
          <ButtonCircle
            type="submit"
            className="absolute transform top-1/2 -translate-y-1/2 end-1 dark:bg-neutral-300 dark:text-black"
          >
            <ArrowRightIcon className="w-5 h-5 rtl:rotate-180" />
          </ButtonCircle>
        </form>
      </div>
      <div className="flex-grow">
        <Image
          alt="subsc"
          sizes="(max-width: 768px) 100vw, 50vw"
          src={rightImg}
        />
      </div>
    </div>
  )
}

export default SectionSubscribe2
